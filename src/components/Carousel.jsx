import React from 'react';
import { useState } from 'react';

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <section className='carousel'>
        <i className='left-arrow' onClick={prevSlide}>{'<'}</i>
        <i className='right-arrow' onClick={nextSlide}>{'>'}</i>
        {images.map((image, index) => {
            return (
                <div
                    className={index === current ? 'slide active' : 'slide'}
                    key={index}
                >
                    {index === current && (
                        <img src={image} alt='Imagen del hotel' className='image' />
                    )}
                </div>
            );
        })}
    </section>
  );
};

export default Carousel;

