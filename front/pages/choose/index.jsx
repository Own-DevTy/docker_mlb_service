import * as React from 'react';
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

import { getPlayerInfo } from '@/pages/choose/paginationData.jsx';

const Component = () => {
    const LIMIT = 25;

    const [data, setData] = React.useState({
        nodes: [],
        pageInfo: {
            totalPages: 0,
        },
    });

    const fetchData = React.useCallback(async (offset, limit) => {
        try {
            const playerInfo = await getPlayerInfo('hitting', offset, limit);
            setData({
                nodes: playerInfo.nodes,
                pageInfo: {
                    totalPages: Math.floor(playerInfo.size / LIMIT),
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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

    function onPaginationChange(action, state) {
        fetchData(state.page * state.size, state.size);
    }

    return (
        <>
            <Table data={data} pagination={pagination}>
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
                                    <Cell>{item.team_name}</Cell>
                                    <Cell>{item.name}</Cell>
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
                        justifyContent: 'space-between',
                    }}
                >
                    <span></span>
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
        </>
    );
};

export default Component;
