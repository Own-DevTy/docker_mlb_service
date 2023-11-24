import { Body, Header, HeaderCell, HeaderRow, Row, Table } from "@table-library/react-table-library/table";
import { Fragment } from "react";
import * as React from "react";
import styled from 'styled-components'; 

const CustomHeaderCell = styled(HeaderCell)`
  color: ${props => props.isHigher ? 'green' : 'black'};
`;

const TableComponent = () => {
  const tableData = {
    nodes: [
      {
        id: 1,              //임의의 값
        stats_1: "12",
        stats_2: "3",
        stats_3: "11",
        stats_4: "21",
        stats_5: "14",
      },
      {
        id: 2,              //임의의 값
        stats_1: "10",
        stats_2: "30",
        stats_3: "33",
        stats_4: "9",
        stats_5: "4",
      },
    ],
  };

  return (
    <Table data={tableData}>
      {(tableList) => (
        <Fragment>
          <Header>
            <HeaderRow>
              {Array.from({ length: 5 }, (_, index) => (
                <CustomHeaderCell key={index}>스탯 {index + 1}</CustomHeaderCell>
              ))}
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item, index) => (
              <Row key={index} item={item}>
                {Array.from({ length: 5 }, (_, index) => {
                  const currentStat = item[`stats_${index + 1}`];
                  const firstStat = tableData.nodes[0][`stats_${index + 1}`];
                  const secondStat = tableData.nodes[1][`stats_${index + 1}`];
                  const isFirstHigher = parseFloat(currentStat) > parseFloat(secondStat);
                  const isSecondHigher = parseFloat(currentStat) > parseFloat(firstStat);
                  const isHigherStat = item.id === 1 ? isFirstHigher : isSecondHigher;
                  return (
                    <CustomHeaderCell
                      key={index}
                      isHigher={isHigherStat}>
                      {currentStat}
                    </CustomHeaderCell>
                  );})}</Row>
            ))}
          </Body>
        </Fragment>
      )}
    </Table>
  );
};

export default TableComponent;