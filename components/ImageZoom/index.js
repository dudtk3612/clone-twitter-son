import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  CloseBtn,
  Global,
  Header,
  ImageZoomWrapper,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from './styles';

const ImagesZoom = ({ onClose, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <ImageZoomWrapper>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            infinite
            arrows={false}
            initialSlide={0}
            slidesToScroll={1}
            slidesToShow={1}
            afterChange={(slide) => setCurrentSlide(slide)}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} {' / '} {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </ImageZoomWrapper>
  );
};

ImagesZoom.propTypes = {
  onClose: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired,
};

export default ImagesZoom;
