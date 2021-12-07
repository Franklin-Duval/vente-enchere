import styled from '@emotion/styled';
import { Avatar, Space } from 'antd';

const CardContainer = styled.div`
  margin: 10px;
  height: 200px;
  min-width: 300px;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 3px 5px 0 rgba(81, 45, 168, 0.3),
    0 6px 20px 0 rgba(81, 45, 168, 0.3);

  .name {
    font-size: 16px;
    margin-bottom: 10px;
    font-family: 'Montserrat';
    margin: 0;
  }

  .comment {
    display: block;
    font-size: 14px;
    white-space: normal;
  }

  .date {
    color: #777;
    font-style: italic;
    margin: 0;
    font-size: 12px;
  }

  @media (min-width: 768px) {
    margin: 20px;
  }
`;

export const CommentCard = ({
  name,
  comment,
  date,
}: {
  name: string;
  comment: string;
  date: string;
}) => {
  return (
    <CardContainer>
      <Space style={{ marginBottom: 20 }}>
        <Avatar style={{ backgroundColor: '#f56a00' }} size='large'>
          {name[0]}
        </Avatar>
        <div>
          <p className='name'>{name}</p>
          <p className='date'>{date}</p>
        </div>
      </Space>
      <p className='comment'>{comment}</p>
    </CardContainer>
  );
};
