import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImageZoom from './ImageZoom';

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const imageStyle = useMemo(() => ({ width: '100%' }), []);
  const imagesStyle = useMemo(() => ({ width: '50%' }), []);
  const moreImageStyle = useMemo(
    () => ({
      width: '50%',
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'middle',
    }),
    []
  );

  const onImageZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div>
        <img
          src={images[0].src}
          alt={images[0].src}
          role='presentation'
          style={imageStyle}
          onClick={onImageZoom}
        />
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div>
        <img
          src={images[0].src}
          alt={images[0].src}
          role='presentation'
          style={imagesStyle}
          onClick={onImageZoom}
        />
        <img
          src={images[1].src}
          alt={images[1].src}
          role='presentation'
          style={imagesStyle}
          onClick={onImageZoom}
        />
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  return (
    <div>
      <img
        src={images[0].src}
        alt={images[0].src}
        role='presentation'
        style={imagesStyle}
        onClick={onImageZoom}
      />
      <div role='presentation' style={moreImageStyle} onClick={onImageZoom}>
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더 보기
      </div>
      {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
