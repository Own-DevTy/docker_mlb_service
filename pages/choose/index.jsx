import styles from '@/styles/choose.module.css';

import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import getPlayerInfo from '@/pages/choose/paginationData.jsx';
import { useTheme } from '@table-library/react-table-library/theme';
import { Fragment, useCallback, useEffect, useState } from 'react';
import PlayerTable from '@/components/table/PlayerTableForChoose';
import { BiBaseball } from 'react-icons/bi';
import { FaBaseballBatBall } from 'react-icons/fa6';

const Component = ({ pid, position, player }) => {
    const LIMIT = 10;

    const [data, setData] = useState({
        nodes: [],
        pageInfo: {
            totalPages: 0,
        },
    });

    //테이블 테마
    const theme = useTheme({
        Row: `
            cursor: pointer;
            .td {
              border-top: 1px solid #a0a8ae;
              border-bottom: 1px solid #a0a8ae;
              margin-top: -1px;
            }
    
            &:hover .td {
                color: #007FFF;
            }
          `,
        BaseCell: `
          margin-bottom: 0%;
          padding: 1%;
        `,
    });

    const fetchData = useCallback((offset, limit) => {
        getPlayerInfo('pitching', offset, limit)
            .then((playerInfo) => {
                setData({
                    nodes: playerInfo.nodes,
                    pageInfo: {
                        totalPages: Math.floor(playerInfo.size / LIMIT),
                    },
                });
            })
            .catch((error) => {
                console.error('fetching data error:', error);
            });
    }, []);

    useEffect(() => {
        fetchData(0, LIMIT);
    }, [fetchData]);

    const pagination = usePagination(
        data,
        {
            state: {
                page: 0,
                size: LIMIT,
            },
            onChange: onPaginationChange,
        },
        {
            isServer: true,
        }
    );
    function handleCellClick(item, index) {
        console.log(`셀 클릭! index ${index + 1}:`, item);
    }

    function onPaginationChange(action, state) {
        fetchData(state.page * state.size, state.size);
    }

    return (
        <div className={styles.main_box}>
            <div className={styles.intro_player}>
                <img
                    className={styles.thumb}
                    src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${pid}/headshot/67/current`}
                    alt="Player"
                />

                <div className={styles.statWrapper}>
                    <div className={styles}>
                        <div>이름: {player.name}</div>
                        <div>나이: {player.age}</div>
                        <div>키: {player.height}</div>
                        <div>몸무게: {player.weight}</div>
                    </div>
                    <div>
                        {position !== 'hitting' ? (
                            <BiBaseball fontSize={'2rem'} />
                        ) : (
                            <FaBaseballBatBall fontSize={'2rem'} />
                        )}
                    </div>
                    <PlayerTable data={player} position={position} />
                </div>
            </div>
            <div className={styles.player_table}>
                <Table data={data} pagination={pagination} theme={theme}>
                    {(tableList) => (
                        <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell>팀 이름</HeaderCell>
                                    <HeaderCell>선수 이름</HeaderCell>
                                </HeaderRow>
                            </Header>

                            <Body>
                                {tableList.map((item, index) => (
                                    <Row key={index}>
                                        <Cell
                                            onClick={() =>
                                                handleCellClick(item, index)
                                            }
                                        >
                                            {item.team_name}
                                        </Cell>
                                        <Cell
                                            onClick={() =>
                                                handleCellClick(item, index)
                                            }
                                        >
                                            {item.name}
                                        </Cell>
                                    </Row>
                                ))}
                            </Body>
                        </>
                    )}
                </Table>
                <div className={styles.list}></div>
                <div className={styles.compare_btn}>
                    {/*<a href="./compare">*/}
                    {/*    <button className={styles.Button1}>*/}
                    {/*        스탯 비교 시작*/}
                    {/*    </button>{' '}*/}
                    {/*</a>*/}
                    {data.pageInfo && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>
                                페이지 : {pagination.state.page + 1} of{' '}
                                {data.pageInfo.totalPages}{' '}
                                <button
                                    type="button"
                                    disabled={pagination.state.page === 0}
                                    onClick={() => pagination.fns.onSetPage(0)}
                                >
                                    {'|<'}
                                </button>
                                <button
                                    type="button"
                                    disabled={pagination.state.page === 0}
                                    onClick={() =>
                                        pagination.fns.onSetPage(
                                            pagination.state.page - 1
                                        )
                                    }
                                >
                                    {'<'}
                                </button>
                                <button
                                    type="button"
                                    disabled={
                                        pagination.state.page + 1 ===
                                        data.pageInfo.totalPages
                                    }
                                    onClick={() =>
                                        pagination.fns.onSetPage(
                                            pagination.state.page + 1
                                        )
                                    }
                                >
                                    {'>'}
                                </button>
                                <button
                                    type="button"
                                    disabled={
                                        pagination.state.page + 1 ===
                                        data.pageInfo.totalPages
                                    }
                                    onClick={() =>
                                        pagination.fns.onSetPage(
                                            data.pageInfo.totalPages - 1
                                        )
                                    }
                                >
                                    {'>|'}
                                </button>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Component;

export async function getServerSideProps(context) {
    const pid = context.query?.pid;
    const position = context.query?.position;

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

    const player_data = await pid_res.json();

    return {
        props: {
            pid: pid,
            position: position,
            player: player_data,
        },
    };
}
