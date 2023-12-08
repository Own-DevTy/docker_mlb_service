import styles from '@/styles/compare.module.css';
import Plist, { Item } from '@/pages/compare/Plist';
import Chart from '@/components/chart/chart';
import PlayerTable from '@/components/table/PlayerTable';
import React, { Fragment, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useHistoryCookies } from '@/cookie/useHistoryCookies';

export default function CompareResult({ pid, position, playerData, players }) {
    const { data: session, status } = useSession();
    const { historyCookies, setHistoryCookie, removeHistoryCookie } =
        useHistoryCookies();

    useEffect(() => {
        if (status === 'loading') {
        } else if (status === 'authenticated') {
            async function postHistory() {
                await players.map(async (data) => {
                    const res = await fetch(
                        `${process.env.api}/compare_history/${session.user.id}`,
                        {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                player_fir: pid,
                                player_sec: data.id,
                                player_position: position !== 'hitting',
                            }),
                        }
                    );
                });
            }

            postHistory();
        } else if (status === 'unauthenticated') {
            players.map((value) => {
                if (historyCookies[`${pid} ${value.id}`] === undefined) {
                    setHistoryCookie(
                        `${pid} ${value.id}`,
                        `{"key": "${pid} ${value.id}",
                        "player1":${JSON.stringify(
                            playerData
                        )},"player2":${JSON.stringify(value)},
                        "position":"${position}"}`
                    );
                }
            });
        }
    }, [status]);

    const render = () => {
        return (
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.left_top}>
                        <div className={styles.circle_left}>
                            <img
                                className={styles.thumb}
                                src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${pid}/headshot/67/current`}
                                alt="Player"
                            />
                            <div className={styles.left_stats1}>
                                <div>이름 : {playerData.name}</div>
                                <div>나이 : {playerData.age}</div>
                                <div>키 : {playerData.height}</div>
                                <div>몸무게 : {playerData.weight}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.left_body}>
                        <div className={styles.left_stats2}>
                            <PlayerTable
                                data={playerData}
                                position={position}
                            />
                        </div>
                        <div className={styles.left_stats3}>
                            <div className={styles.left_stats3_1}>
                                {Chart(
                                    position === 'hitting',
                                    playerData.name,
                                    position === 'hitting'
                                        ? playerData.avg
                                        : playerData.strikeOuts,
                                    position === 'hitting'
                                        ? playerData.obp
                                        : playerData.era,
                                    position === 'hitting'
                                        ? playerData.slg
                                        : playerData.baseOnBalls,
                                    position === 'hitting'
                                        ? playerData.ops
                                        : playerData.whip,
                                    position === 'hitting'
                                        ? playerData.homeRuns
                                        : playerData.strikeoutsPer9Inn
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <Plist>
                        {players.map((data, index) => (
                            <Item
                                key={index}
                                playerData={playerData}
                                data={data}
                                position={position}
                            ></Item>
                        ))}
                    </Plist>
                </div>
            </div>
        );
    };
    return render();
}

export async function getServerSideProps(context) {
    const pid = context.query?.pid;
    const position = context.query?.position;
    const pids = context.query?.pids;

    if (position !== 'hitting' && position !== 'pitching')
        return { notFound: true };

    let pid_res;
    if (position === 'hitting') {
        pid_res = await fetch(`${process.env.api}/player/${pid}/hitting`);
    } else {
        pid_res = await fetch(`${process.env.api}/player/${pid}/pitching`);
    }

    if (pid_res.status === 400 || pid_res.status === 500)
        return { notFound: true };

    let res;
    const players_data = await Promise.all(
        Array.from(JSON.parse(pids)).map(async (value) => {
            if (position === 'hitting') {
                res = await fetch(`${process.env.api}/player/${value}/hitting`);
            } else {
                res = await fetch(
                    `${process.env.api}/player/${value}/pitching`
                );
            }
            if (res.status === 400 || res.status === 500)
                throw Error('server error');
            const data = await res.json();
            return data;
        })
    ).catch(() => {
        return false;
    });
    if (players_data === false) {
        return { notFound: true };
    }
    const player_data = await pid_res.json();

    return {
        props: {
            pid: pid,
            position: position,
            playerData: player_data,
            players: players_data,
        },
    };
}
