/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { VendeurContainer } from '../components/VendeurContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
    border-radius: 20px;

    > p {
      font-size: 20px;
      margin-bottom: 20px;
    }

    > h2 {
      font-size: 25px;
      text-decoration: underline;
      font-weight: bold;
      margin-bottom: 50px;
    }
  }
`;

export const Wallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {}, []);

  return (
    <VendeurContainer clicked='wallet'>
      <Container>
        <div>
          <h2>Etat de votre compte</h2>
          <p>
            Montant : <strong>56000 FCFA</strong>{' '}
          </p>
          <Space>
            <ButtonWithModal
              buttonText='Recharger mon compte'
              modalProps={{ title: 'Information de recharge' }}
              buttonProps={{
                type: 'primary',
                size: 'large',
                icon: <FaWallet style={{ marginRight: 5 }} />,
              }}
            >
              {(closeModal) => (
                <div>
                  <h2>Remplir les informations de recharge</h2>
                </div>
              )}
            </ButtonWithModal>

            <ButtonWithModal
              buttonText='Recharger mon compte'
              modalProps={{ title: 'Information de recharge' }}
              buttonProps={{
                type: 'default',
                size: 'large',
                danger: true,
                icon: <FiTrendingUp style={{ marginRight: 5 }} />,
              }}
            >
              {(closeModal) => (
                <div>
                  <h2>Remplir les informations de retrait</h2>
                </div>
              )}
            </ButtonWithModal>
          </Space>
        </div>
      </Container>

      <h2>Historique des transactions</h2>
      <DataTable
        loading={isLoading}
        data={transactions}
        columns={TransactiosColumns}
      />
    </VendeurContainer>
  );
};

const TransactiosColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: dateFormatter,
  },
  {
    title: 'Montant',
    dataIndex: 'montant',
    key: 'prixMin',
    render: (cell: number, row: any) => (
      <span>
        {cell} {'FCFA'}
      </span>
    ),
  },
  {
    title: 'Type de transaction',
    dataIndex: 'type',
    key: 'type',
  },
];
