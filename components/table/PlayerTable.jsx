import {Body, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Fragment} from "react";
import * as React from "react";


const TableComponent = () => {
  const tableData = [
    {
      id: 1,
      name: 'Task 1',
      deadline: new Date(2023, 10, 15),
      type: 'Type A',
      isComplete: true,
      tasks: ['Subtask 1', 'Subtask 2'],
    },
  ];

  return (
    <Table data={tableData}>
  <Header>
    <HeaderRow>
      <HeaderCell>Task</HeaderCell>
      <HeaderCell>Deadline</HeaderCell>
      <HeaderCell>Type</HeaderCell>
      <HeaderCell>Complete</HeaderCell>
      <HeaderCell>Tasks</HeaderCell>
    </HeaderRow>
  </Header>
  <Body>
    {tableData.map((item) => (
      <Row key={item.id} item={item}>
        <HeaderCell>{item.name}</HeaderCell>
        <HeaderCell>
          {item.deadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </HeaderCell>
        <HeaderCell>{item.type}</HeaderCell>
        <HeaderCell>{item.isComplete.toString()}</HeaderCell>
        <HeaderCell>
          <ul>
            {item.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </HeaderCell>
      </Row>
    ))}
  </Body>
</Table>
  );
};

export default TableComponent;