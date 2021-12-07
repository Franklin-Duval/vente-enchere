import { Button, Space } from 'antd';

export const ConfirmDelete = ({
  bodyText,
  onClose,
  onConfirm,
}: {
  bodyText: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <h3>{bodyText} </h3>
      <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='primary' onClick={() => onClose()}>
          Annuler
        </Button>
        <Button type='primary' onClick={() => onConfirm()} danger>
          Confirmer
        </Button>
      </Space>
    </Space>
  );
};
