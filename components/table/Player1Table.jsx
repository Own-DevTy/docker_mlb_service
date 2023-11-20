import {Body, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Fragment} from "react";
import * as React from "react";

const Player1Table = () => {
    const tableData = {
      nodes: [
        {
          stats_1: "12",
          stats_2: "3",
          stats_3: "11",
          stats_4: "21",
          stats_5: "14",
        },
      ]
    };
  
    // tableData의 첫 번째 항목만 선택하여 사용
    const item = tableData.nodes[0];
  
    return (
      <Table data={{ nodes: [item] }}>
        {(tableList) => (
          <Fragment>
            <Header>
              <HeaderRow>
                <HeaderCell>스탯 1</HeaderCell>
                <HeaderCell>스탯 2</HeaderCell>
                <HeaderCell>스탯 3</HeaderCell>
                <HeaderCell>스탯 4</HeaderCell>
                <HeaderCell>스탯 5</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {/* 반복문 대신 단일 항목만 렌더링 */}
              <Row key={item.id} item={item}>
                <HeaderCell>{item.stats_1}</HeaderCell>
                <HeaderCell>{item.stats_2}</HeaderCell>
                <HeaderCell>{item.stats_3}</HeaderCell>
                <HeaderCell>{item.stats_4}</HeaderCell>
                <HeaderCell>{item.stats_5}</HeaderCell>
              </Row>
            </Body>
          </Fragment>
        )}
      </Table>
    );
  };
  
  export default Player1Table