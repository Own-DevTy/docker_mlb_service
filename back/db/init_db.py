import datetime
from typing import List, Any

import logging
import time

from sqlalchemy.orm import Session

import requests

from db.base import Base, UserBase
from db.session import engine
from schemas.team import TeamCreate
from schemas.player import HittingCreate, PitchingCreate
import crud

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
base_url = 'https://statsapi.mlb.com'


def feet_to_cm(feet_string) -> float:
    parts = feet_string.split("'")
    feet = int(parts[0])
    inches = 0
    if len(parts) > 1:
        inches = int(parts[1].replace('"', ''))

    return round((feet * 30.48) + (inches * 2.54), 1)


def measure_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        data = func(*args, **kwargs)
        end_time = time.time()
        logger.info(f"time elapsed: {end_time - start_time:.4}sec")
        return data

    return wrapper


def err_check(req_data: requests.Response, name: str) -> None:
    if req_data.status_code != 200:
        raise Exception(f"{__name__}\t{name}= [status_code: {req_data.status_code}  "
                        + f"error: {req_data.json()['error']}]")


@measure_time
def fetch_player_data(group: str, player_pool='ALL_CURRENT', season=datetime.date.today().year, limit=100) -> List[Any]:
    fields = ['stats', 'totalSplits', 'splits']
    fields += ['stat', 'avg', 'obp', 'slg', 'ops', 'homeRuns', 'strikeOuts', 'era', 'baseOnBalls', 'whip', 'strikeoutsPer9Inn']
    fields += ['player', 'id', 'fullName', 'firstName', 'lastName', 'link']
    fields += ['team', 'id']

    url = (f"{base_url}/api/v1/stats?playerPool={player_pool}&season={season}&stats=season&sportId=1&group={group}&"
           f"fields={','.join(fields)}&limit={0}")
    req_data = requests.get(url)
    err_check(req_data, 'totalSplits')
    total_splits = req_data.json()['stats'][0]['totalSplits']
    logger.info(f"{group}: found {total_splits} {group} datas")

    json_data = []
    logger.info(f"start fetch {group} data")
    for i in range(int(total_splits / limit) + 1):
        offset_url = (
            f"{base_url}/api/v1/stats?playerPool={player_pool}&season={season}&stats=season&sportId=1&group={group}&"
            f"fields={','.join(fields)}&limit={limit}&offset={limit * i}")
        try:
            req_data = requests.get(offset_url)
        except:
            logger.info("wait 5sec...")
            time.sleep(5)
            req_data = requests.get(offset_url)
        err_check(req_data, group)
        data_json = req_data.json()

        # Extend Data {Player currentAge}
        for j in data_json['stats'][0]['splits']:
            player_url = f"{base_url}{j['player']['link']}"
            try:
                req_data = requests.get(player_url)
            except:
                logger.info("wait 5sec...")
                time.sleep(5)
                req_data = requests.get(player_url)
            err_check(req_data, f"{str} extend player data")
            j['player']['age'] = req_data.json()['people'][0]['currentAge']
            j['player']['height'] = feet_to_cm(req_data.json()['people'][0]['height'])
            j['player']['weight'] = round(float(int(req_data.json()['people'][0]['weight']) / 2.205), 1)
        json_data += data_json['stats'][0]['splits']

    logger.info(f"end fetch {group} data")
    return json_data


def fetch_mlb_data(season=datetime.date.today().year) -> dict:
    team_url = f"{base_url}/api/v1/teams?season={season}&sportId=1"

    hitting_data = fetch_player_data('hitting')
    pitching_data = fetch_player_data('pitching')

    req_data_team = requests.get(team_url)

    err_check(req_data_team, 'teams')

    return {'hitting': hitting_data,
            'pitching': pitching_data,
            'teams': req_data_team.json()['teams']}


def load_team_data(db: Session, teams: dict) -> None:
    for team in teams:
        team_in = TeamCreate(id=team['id'],
                             name=team['name'],
                             league_name=team['league']['name'],
                             link=team['link'])
        crud.team.create(db, obj_in=team_in)


@measure_time
def load_player_data(db: Session, hitting: dict, pitching: dict) -> None:
    logger.info(f"Save to hitting table in database")
    for hitter in hitting:
        hitter_in = HittingCreate(id=hitter['player']['id'],
                                  name=hitter['player']['fullName'],
                                  first_name=hitter['player']['firstName'],
                                  last_name=hitter['player']['lastName'],
                                  link=hitter['player']['link'],
                                  age=hitter['player']['age'],
                                  height=hitter['player']['height'],
                                  weight=hitter['player']['weight'],
                                  team_id=hitter['team']['id'],
                                  avg=hitter['stat']['avg'],
                                  obp=hitter['stat']['obp'],
                                  slg=hitter['stat']['slg'],
                                  ops=hitter['stat']['ops'],
                                  homeRuns=hitter['stat']['homeRuns'])
        crud.hitting.create(db, obj_in=hitter_in)
    logger.info(f"Saved to hitting table in database")
    logger.info(f"Save to pitching table in database")
    for pitcher in pitching:
        pitcher_in = PitchingCreate(id=pitcher['player']['id'],
                                    name=pitcher['player']['fullName'],
                                    first_name=pitcher['player']['firstName'],
                                    last_name=pitcher['player']['lastName'],
                                    link=pitcher['player']['link'],
                                    age=pitcher['player']['age'],
                                    height=pitcher['player']['height'],
                                    weight=pitcher['player']['weight'],
                                    team_id=pitcher['team']['id'],
                                    strikeOuts=pitcher['stat']['strikeOuts'],
                                    era=pitcher['stat']['era'],
                                    baseOnBalls=pitcher['stat']['baseOnBalls'],
                                    whip=pitcher['stat']['whip'],
                                    strikeoutsPer9Inn=pitcher['stat']['strikeoutsPer9Inn'])
        crud.pitching.create(db, obj_in=pitcher_in)
    logger.info(f"Saved to pitching table in database")


def init_db(db: Session) -> None:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    UserBase.metadata.create_all(engine)
    data = fetch_mlb_data()
    load_team_data(db, data['teams'])
    load_player_data(db, data['hitting'], data['pitching'])
