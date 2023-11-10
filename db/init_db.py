import datetime
from typing import List, Any

import logging

from sqlalchemy.orm import Session

import requests

from db.base import Base, models
from db.session import engine
from schemas.team import TeamCreate
from schemas.player import HittingCreate, PitchingCreate
import crud


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
base_url = 'https://statsapi.mlb.com/api/v1'


def err_check(req_data: requests.Response, name: str) -> None:
    if req_data.status_code != 200:
        raise Exception(f"{__name__}\t{name}= [status_code: {req_data.status_code}  "
                        + f"error: {req_data.json()['error']}]")


def fetch_player_data(group: str, player_pool='ALL_CURRENT', season=datetime.date.today().year, limit=100) -> List[Any]:
    fields = ['stats', 'totalSplits', 'splits']
    fields += ['player', 'id', 'fullName', 'firstName', 'lastName', 'link']
    fields += ['team', 'id']

    url = (f"{base_url}/stats?playerPool={player_pool}&season={season}&stats=season&sportId=1&group={group}&"
           f"fields={','.join(fields)}&limit={0}")
    req_data = requests.get(url)
    err_check(req_data, 'totalSplits')
    total_splits = req_data.json()['stats'][0]['totalSplits']
    logger.info(f"{group}: found {total_splits} {group} datas")
    json_data = []
    logger.info(f"start fetch {group} data")
    for i in range(int(total_splits / limit) + 1):
        offset_url = (f"{base_url}/stats?playerPool={player_pool}&season={season}&stats=season&sportId=1&group={group}&"
                      f"fields={','.join(fields)}&limit={limit}&offset={limit*i}")
        req_data = requests.get(offset_url)
        err_check(req_data, group)
        json_data += req_data.json()['stats'][0]['splits']
    logger.info(f"end fetch {group} data")

    return json_data


def fetch_mlb_data(season=datetime.date.today().year, limit=50) -> dict:
    team_url = f"{base_url}/teams?season={season}&sportId=1"

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


def load_player_data(db: Session, hitting: dict, pitching: dict) -> None:
    logger.info(f"Save to hitting table in database")
    for hitter in hitting:
        hitter_in = HittingCreate(id=hitter['player']['id'],
                                  name=hitter['player']['fullName'],
                                  first_name=hitter['player']['firstName'],
                                  last_name=hitter['player']['lastName'],
                                  link=hitter['player']['link'],
                                  team_id=hitter['team']['id'])
        crud.hitting.create(db, obj_in=hitter_in)
    logger.info(f"Saved to hitting table in database")
    logger.info(f"Save to pitching table in database")
    for pitcher in pitching:
        pitcher_in = PitchingCreate(id=pitcher['player']['id'],
                                    name=pitcher['player']['fullName'],
                                    first_name=pitcher['player']['firstName'],
                                    last_name=pitcher['player']['lastName'],
                                    link=pitcher['player']['link'],
                                    team_id=pitcher['team']['id'])
        crud.pitching.create(db, obj_in=pitcher_in)
    logger.info(f"Saved to pitching table in database")


def init_db(db: Session) -> None:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    data = fetch_mlb_data()
    load_team_data(db, data['teams'])
    load_player_data(db, data['hitting'], data['pitching'])
