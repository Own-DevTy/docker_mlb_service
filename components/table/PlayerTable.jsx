import {Body, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Fragment} from "react";
import * as React from "react";
import styled from 'styled-components'; 
const CustomHeaderCell = styled(HeaderCell)`
  color: ${props => props.isHigher ? 'red' : 'black'};
`;

const TableComponent = () => {
  const tableData = {
    nodes: [
      {
        id: 1,
        stats_1 : "1",
        stats_2 : "3",
        stats_3 : "11",
        stats_4 : "21",
        stats_5 : "14",
      },
      {
        id: 2,          
        stats_1 : "10",
        stats_2 : "30",
        stats_3 : "110",
        stats_4 : "210",
        stats_5 : "140",
      },
    ]
  };

  const isHigher = (first, second) => parseFloat(first) > parseFloat(second);

  return (
    <Table data={tableData}>
      {(tableList) => (
        <Fragment>
          <Header>
            <HeaderRow>
              <CustomHeaderCell>스탯 1</CustomHeaderCell>
              <CustomHeaderCell>스탯 2</CustomHeaderCell>
              <CustomHeaderCell>스탯 3</CustomHeaderCell>
              <CustomHeaderCell>스탯 4</CustomHeaderCell>
              <CustomHeaderCell>스탯 5</CustomHeaderCell>
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item, index) => (
              <Row key={index} item={item}>
                <CustomHeaderCell isHigher={isHigher(item.stats_1, tableData.nodes[0].stats_1)}>{item.stats_1}</CustomHeaderCell>
                <CustomHeaderCell isHigher={isHigher(item.stats_2, tableData.nodes[0].stats_2)}>{item.stats_2}</CustomHeaderCell>
                <CustomHeaderCell isHigher={isHigher(item.stats_3, tableData.nodes[0].stats_3)}>{item.stats_3}</CustomHeaderCell>
                <CustomHeaderCell isHigher={isHigher(item.stats_4, tableData.nodes[0].stats_4)}>{item.stats_4}</CustomHeaderCell>
                <CustomHeaderCell isHigher={isHigher(item.stats_5, tableData.nodes[0].stats_5)}>{item.stats_5}</CustomHeaderCell>
              </Row>
            ))}
          </Body>
        </Fragment>
      )}
    </Table>
  );
};

export default TableComponent;