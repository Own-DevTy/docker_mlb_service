import * as React from 'react';
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
import { Fragment } from 'react';

const Component = () => {
    const LIMIT = 10;

    const [data, setData] = React.useState({
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

    const fetchData = React.useCallback((offset, limit) => {
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

    React.useEffect(() => {
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
                <p>인트로 선수</p>{' '}
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
