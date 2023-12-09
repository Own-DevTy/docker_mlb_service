import {
    Body,
    Header,
    HeaderCell,
    Cell,
    HeaderRow,
    Row,
    Table,
} from '@table-library/react-table-library/table';
import { Fragment } from 'react';

const theme = {
    HeaderCell: `
    & {
        text-align: center;
        font-size: 1.5rem;
    }
    `,
    Cell: `
    & {
        font-size: 1.3rem;
        text-align: center;
    }
    `,
};
const PlayerTable = ({ data, position }) => {
    const tableData = {
        nodes: [data],
    };

    return (
        <Table data={tableData} theme={theme}>
            {(tableList) => (
                <Fragment>
                    <Header>
                        <HeaderRow className="headerRow">
                            {position === 'hitting' ? (
                                <Fragment>
                                    {/*avg: 타율, obp: 출루율, slg: 장타율*/}
                                    {/*ops: 출루율+장타율, homeRuns: 홈런*/}
                                    <HeaderCell>타율</HeaderCell>
                                    <HeaderCell>출루율</HeaderCell>
                                    <HeaderCell>장타율</HeaderCell>
                                    <HeaderCell>출루율+장타율</HeaderCell>
                                    <HeaderCell>홈런</HeaderCell>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {/* strikeOuts: 삼진 아웃 수, era: 평균 자책점,*/}
                                    {/*baseOnBalls: 볼넷 수, whip: 출루 허용률*/}
                                    {/* strikeoutsPer9Inn: K/9*/}
                                    <HeaderCell>삼진</HeaderCell>
                                    <HeaderCell>평균 자책점</HeaderCell>
                                    <HeaderCell>볼넷</HeaderCell>
                                    <HeaderCell>출루 허용률</HeaderCell>
                                    <HeaderCell>K/9</HeaderCell>
                                </Fragment>
                            )}
                        </HeaderRow>
                    </Header>
                    <Body>
                        {tableList.map((item, index) => (
                            <Row key={index} item={item} className="row">
                                {position === 'hitting' ? (
                                    <Fragment>
                                        <Cell>{item.avg}</Cell>
                                        <Cell>{item.obp}</Cell>
                                        <Cell>{item.slg}</Cell>
                                        <Cell>{item.ops}</Cell>
                                        <Cell>{item.homeRuns}</Cell>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Cell>{item.strikeOuts}</Cell>
                                        <Cell>{item.era}</Cell>
                                        <Cell>{item.baseOnBalls}</Cell>
                                        <Cell>{item.whip}</Cell>
                                        <Cell>{item.strikeoutsPer9Inn}</Cell>
                                    </Fragment>
                                )}
                            </Row>
                        ))}
                    </Body>
                </Fragment>
            )}
        </Table>
    );
};

export default PlayerTable;
