import styled from '@emotion/styled';
import { Input, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ReactNode, useState } from 'react';
import { SEMIDARK } from '../../../shared/colors';

const DataTableContainer = styled.div`
  th {
    background-color: ${SEMIDARK} !important;
    color: white !important;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    zoom: 1;
  }
`;

export const DataTable = <T extends { _id: string }>({
  data,
  columns,
  loading,
  filterFunction,
  buttons,
}: {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  filterFunction?: (dataItem: T, filterValue: string) => boolean;
  buttons?: ReactNode;
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [rowId, setRowId] = useState('');

  const dataToShow = data?.filter((dataItem) =>
    filterFunction ? filterFunction(dataItem, filterValue) : true,
  );

  return (
    <DataTableContainer>
      <Space style={{ marginBottom: 10 }}>
        <Input
          placeholder='Filtrer'
          style={{ width: 300 }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        {buttons}
      </Space>
      <Table
        dataSource={dataToShow}
        columns={columns}
        loading={loading}
        size='middle'
        rowKey='_id'
        rowClassName={(row, index) =>
          rowId === row._id
            ? 'is-bold'
            : index % 2 === 0
            ? 'even-row'
            : 'odd-row'
        }
        onRow={(row) => ({
          onClick: () => {
            setRowId(row._id);
          },
        })}
      />
    </DataTableContainer>
  );
};
