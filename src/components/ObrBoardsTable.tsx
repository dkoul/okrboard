import React from 'react';
import { useTable, useExpanded } from 'react-table';
import { Table } from 'react-bootstrap';

const data = [
  { firstName: 'train', age: 20, subRows: [{ firstName: 'subtrain', age: 20_20 }] },
  { firstName: 'train1', age: 30, subRows: [{ firstName: 'subtrain1', age: 30_30 }] }
];

export function ObrBoardsTable() {
  const columns = React.useMemo(
    () => [
      {
        // Build our expander column
        id: 'expander', // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '👇' : '👉'}</span>
        ),
        Cell: ({ row }) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`
                }
              })}
            >
              {row.isExpanded ? '👇' : '👉'}
            </span>
          ) : null
      },
      {
        Header: 'Name',
        accessor: 'firstName'
      },
      {
        Header: 'Age',
        accessor: 'age'
      }
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
    // state: { expanded }
  } = useTable(
    {
      columns: columns,
      data
    },
    useExpanded // Use the useExpanded plugin hook
  );
  return (
    <Table bordered {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
