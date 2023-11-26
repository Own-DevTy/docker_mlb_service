import {Body, Header, HeaderCell, HeaderRow, Row, Cell, Table} from "@table-library/react-table-library/table";
import {Fragment} from "react";

const PlayerStatTable = ({data}) => {
    const tableData = {
        nodes: [
            data
        ]
    };
    return (
        <Table data={tableData}>
            {(tableList) => (
                <Fragment>
                    <Header>
                        <HeaderRow>
                            {Object.getOwnPropertyNames(tableList[0]).map((col, idx) => (
                                <HeaderCell key={idx}>{col}</HeaderCell>
                            ))}
                        </HeaderRow>
                    </Header>
                    <Body>
                        {tableList.map((item, index, array) => (
                            <Row key={index} item={item}>
                                {Object.keys(item).map(key => (
                                    <Cell key={key}>{item[key]}</Cell>
                                ))}
                            </Row>
                        ))}
                    </Body>
                </Fragment>
            )}
        </Table>
    );
};

export default PlayerStatTable;