import styled from '@emotion/styled';
import { Image } from 'antd';
import { useState } from 'react';
import { defaultImage } from '../../../shared/defaultImage';
import { API_ROUTES } from '../ApiRoutes';

const ImageContainer = styled.div`
  .horizontal-scroll {
    overflow: auto;
    white-space: nowrap;
    width: 320px;
  }

  .horizontal-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .main_image {
    height: 300px;
    width: 320px;
  }

  .sub_image {
    height: 70px;
    width: 70px;
  }

  @media (min-width: 768px) {
    .horizontal-scroll {
      width: 500px;
    }

    .main_image {
      height: 350px;
      width: 500px;
      border-radius: 20px;
    }
    .sub_image {
      height: 100px;
      width: 100px;
      border-radius: 10px;
    }
  }
`;

export const ImageCarousel = ({ imageListIds }: { imageListIds: string[] }) => {
  const [displayImage, setDisplayImage] = useState(imageListIds[0]);
  const [visible, setVisible] = useState(false);

  return (
    <ImageContainer>
      <Image
        alt='land_image'
        className='main_image'
        style={{ objectFit: 'cover' }}
        src={API_ROUTES.IMAGES(displayImage)}
        fallback={defaultImage}
        preview={{ visible: false }}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'flex' }} className='horizontal-scroll'>
        {imageListIds.map((imageId) => (
          <div
            key={imageId}
            style={{ margin: 2, cursor: 'pointer' }}
            onClick={() => setDisplayImage(imageId)}
          >
            <Image
              alt='land_image'
              className='sub_image'
              style={{ objectFit: 'cover' }}
              preview={false}
              src={API_ROUTES.IMAGES(imageId)}
              fallback={defaultImage}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          {imageListIds.map((imageId) => (
            <Image src={API_ROUTES.IMAGES(imageId)} />
          ))}
        </Image.PreviewGroup>
      </div>
    </ImageContainer>
  );
};
