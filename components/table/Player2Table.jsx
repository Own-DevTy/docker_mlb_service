import {Body, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Fragment} from "react";
import * as React from "react";
//데모버전 css때문에 임의 추가(동준)
import styled from "styled-components";

const Player2Table = () => {
  const tableData = {
    nodes: [
      {
        stats_1 : "10",
        stats_2 : "30",
        stats_3 : "33",
        stats_4 : "9",
        stats_5 : "4",
      },
    ]
  };

  return (
    <Table data={tableData}>
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
            {tableList.map((item, index) => (
              <Row key={index} item={item}>
                <HeaderCell>{item.stats_1}</HeaderCell>
                <HeaderCell>{item.stats_2}</HeaderCell>
                <HeaderCell>{item.stats_3}</HeaderCell>
                <HeaderCell>{item.stats_4}</HeaderCell>
                <HeaderCell>{item.stats_5}</HeaderCell>
              </Row>
            ))}
          </Body>
        </Fragment>
      )}
    </Table>
  );
};

export default Player2Table;