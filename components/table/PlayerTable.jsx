import {Body, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Fragment} from "react";



const pagination = usePagination(
    data,
    {
        state: {
            page: 0,
            size: LIMIT,
        },
        onChange: onPaginationChange(action, state),
    },
    {
        isServer: false,
    }
);

function onPaginationChange(action, state) {
    doGet({
        offset: state.page * state.size,
        limit: state.size,
    });
}

export default function PlayerTable({player_json}) {
    return (
        <Table data={player_json} pagination={pagination}>
            {(tableList) => (
                <Fragment>
                    <Header>
                        <HeaderRow>
                            <HeaderCell>사진</HeaderCell>
                            <HeaderCell>이름</HeaderCell>
                            <HeaderCell>나이</HeaderCell>
                            <HeaderCell>포지션</HeaderCell>
                        </HeaderRow>
                    </Header>

                    <Body>
                        {tableList.map((id, name, age)=>(
                            <Row item={}
                        ))}
                    </Body>
                </Fragment>
            )}
        </Table>
    );
}