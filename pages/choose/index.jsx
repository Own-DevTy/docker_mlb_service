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
            &:hover .td {
                color: #007FFF;
            }
          `,
        BaseCell: `
        width: 80%;
          text-align: left;
          padding: 1%;
          &:nth-child(-n+2) {
            width: 150%;
        }
        &:nth-child(2) {
            margin-left: 50%;
        }
        &:nth-child(3) {
            margin-left: 100%;
        }
        &:nth-child(n+4):nth-child(-n+7) {
            margin-left: 100%;
        }
      `,
    });

    const fetchData = useCallback((offset, limit) => {
        getPlayerInfo(position, offset, limit)
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
    const [selectedItemIds, setSelectedItemIds] = useState([]);

    //리스트에서 항목 제거
    const handleRemoveItem = (index) => {
        const newSelectedItemIds = [...selectedItemIds];
        newSelectedItemIds.splice(index, 1);
        setSelectedItemIds(newSelectedItemIds);
    };

    function handleCellClick(item, index) {
        const itemId = item.id;
        const itemName = item.name;

        if (selectedItemIds.length < 5) {
            if (!selectedItemIds.includes(itemId)) {
                setSelectedItemIds([...selectedItemIds, itemId]);

                const queryParams = new URLSearchParams({
                    pid,
                    position,
                    pids: [...selectedItemIds, itemId].join(','),
                });

                const newUrl = `/compare?${queryParams.toString()}`;
                const compareButton = document.getElementById('compareButton');
                compareButton.href = newUrl;
            }
        } else {
            alert('최대 5명까지만 선택할 수 있습니다.');
        }
    }

    function onPaginationChange(action, state) {
        fetchData(state.page * state.size, state.size);
    }

    return (
        <div className={styles.main_box}>
            <div className={styles.left_box}>
                <div className={styles.intro_player}>
                    <img
                        className={styles.thumb}
                        src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${pid}/headshot/67/current`}
                        alt="Player"
                    />

                    <div className={styles.statWrapper}>
                        <div>
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
                                        <HeaderCell>
                                            {position === 'hitting'
                                                ? '타율'
                                                : '삼진수'}
                                        </HeaderCell>
                                        <HeaderCell>
                                            {position === 'hitting'
                                                ? '출루율'
                                                : '자책점'}
                                        </HeaderCell>
                                        <HeaderCell>
                                            {position === 'hitting'
                                                ? '장타율'
                                                : '볼넷수'}
                                        </HeaderCell>
                                        <HeaderCell>
                                            {position === 'hitting'
                                                ? '출루율+장타율'
                                                : '출루 허용'}
                                        </HeaderCell>
                                        <HeaderCell>
                                            {position === 'hitting'
                                                ? '홈런'
                                                : '이닝 삼진수'}
                                        </HeaderCell>
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
                                            <Cell
                                                onClick={() =>
                                                    handleCellClick(item, index)
                                                }
                                            >
                                                {position === 'hitting'
                                                    ? item.avg
                                                    : item.strikeOuts}
                                            </Cell>
                                            <Cell
                                                onClick={() =>
                                                    handleCellClick(item, index)
                                                }
                                            >
                                                {position === 'hitting'
                                                    ? item.obp
                                                    : item.era}
                                            </Cell>
                                            <Cell
                                                onClick={() =>
                                                    handleCellClick(item, index)
                                                }
                                            >
                                                {position === 'hitting'
                                                    ? item.slg
                                                    : item.baseOnBalls}
                                            </Cell>
                                            <Cell
                                                onClick={() =>
                                                    handleCellClick(item, index)
                                                }
                                            >
                                                {position === 'hitting'
                                                    ? item.ops
                                                    : item.whip}
                                            </Cell>
                                            <Cell
                                                onClick={() =>
                                                    handleCellClick(item, index)
                                                }
                                            >
                                                {position === 'hitting'
                                                    ? item.homeRuns
                                                    : item.strikeoutsPer9Inn}
                                            </Cell>
                                        </Row>
                                    ))}
                                </Body>
                            </>
                        )}
                    </Table>
                    {data.pageInfo && (
                        <div
                            style={{
                                display: 'flex',
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
            <div className={styles.right_box}>
                <p className={styles.list_text}>[선택 목록]</p>
                <div className={styles.list}>
                    {selectedItemIds.map((id, index) => (
                        <div key={index}>
                            <span>{`${index + 1}.${player.name}`}</span>
                            <button
                                onClick={() => handleRemoveItem(index)}
                                className={styles.Button2}
                            >
                                항목 삭제
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.compare_btn}>
                    <a
                        id="compareButton"
                        href={`/compare?pid=${pid}&position=${position}&pids=[${selectedItemIds.join(
                            ','
                        )}]`}
                    >
                        <button className={styles.Button1}>비교 시작</button>
                    </a>
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
