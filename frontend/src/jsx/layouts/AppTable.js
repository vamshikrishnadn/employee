import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function AppTable({ columns = [], rows = [], tableData, activeItem, setActiveItem }) {
  const renderItems = () => {
    let items = [];
    for (let number = 1; number <= tableData?.totalCount / 5; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activeItem}
          onClick={() => setActiveItem(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Table striped bordered hover variant='light' responsive className='text-center'>
        <thead>
          <tr>
            <th></th>
            {columns?.map((column, i) => (
              <th key={i}>{column?.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, ri) => (
            <tr key={ri}>
              <td>
                <Form.Check type={'checkbox'} />
              </td>
              {columns?.map((col, ci) => (
                <td key={ci}>
                  {col.value === 'edit' ? (
                    <PencilSquare className='cursor-pointer' />
                  ) : col.value === 'delete' ? (
                    <TrashFill className='cursor-pointer' />
                  ) : (
                    row?.[col?.value] ?? '-'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='d-flex justify-content-center'>
        <Pagination>{renderItems()}</Pagination>
      </div>
    </>
  );
}

export default AppTable;
