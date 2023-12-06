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

const Component = () => {
    const LIMIT = 2;

    const [data, setData] = React.useState({
        nodes: [],
        pageInfo: {
            total: 0,
            totalPages: 0,
        },
    });

    const fetchData = React.useCallback(async () => {
        try {
            const response = await fetch(`${process.env.api}/team/AL`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData({
                nodes: result.teams,
                pageInfo: {
                    total: result.teams.length,
                    totalPages: Math.ceil(result.teams.length / LIMIT),
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
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
        fetchData({
            offset: state.page * state.size,
            limit: state.size,
        });
    }

    const sizes = [1, 2, 3, 4, 5];

    return (
        <>
            <Table data={data} pagination={pagination}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {Object.keys(tableList[0] || {}).map((key) => (
                                    <HeaderCell key={key}>{key}</HeaderCell>
                                ))}
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map((item, index) => (
                                <Row key={index}>
                                    {Object.keys(item).map((key) => (
                                        <Cell key={key}>{item[key]}</Cell>
                                    ))}
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
                    <span>
                        Page Size:{' '}
                        {sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                style={{
                                    fontWeight:
                                        pagination.state.size === size
                                            ? 'bold'
                                            : 'normal',
                                }}
                                onClick={() => pagination.fns.onSetSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                        <button
                            type="button"
                            style={{
                                fontWeight:
                                    pagination.state.size ===
                                    data.pageInfo.total
                                        ? 'bold'
                                        : 'normal',
                            }}
                            onClick={() =>
                                pagination.fns.onSetSize(data.pageInfo.total)
                            }
                        >
                            All
                        </button>
                    </span>

                    <span>
                        Page:{' '}
                        {Array.from(
                            { length: data.pageInfo.totalPages },
                            (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    style={{
                                        fontWeight:
                                            pagination.state.page === index
                                                ? 'bold'
                                                : 'normal',
                                    }}
                                    onClick={() =>
                                        pagination.fns.onSetPage(index)
                                    }
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                    </span>
                </div>
            )}
        </>
    );
};

export default Component;
