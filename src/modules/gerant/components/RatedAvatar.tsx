import styled from '@emotion/styled';
import { Image, Rate } from 'antd';
import { defaultImage } from '../../../shared/defaultImage';

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-item: center;
`;

export const RatedAvatar = ({
  image,
  rate,
}: {
  image: string;
  rate: number;
}) => {
  return (
    <AvatarContainer>
      <Image
        alt='profil_image'
        height={250}
        width={250}
        style={{
          objectFit: 'cover',
        }}
        preview={false}
        /* src={vendor.image} */
        src={image}
        fallback={defaultImage}
      />
      <Rate style={{ alignSelf: 'center' }} disabled defaultValue={rate} />
    </AvatarContainer>
  );
};
