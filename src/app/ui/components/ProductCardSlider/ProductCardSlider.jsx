'use client';

import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import ProductCard from '../ProductCard/ProductCard';
import Image from 'next/image';

import '@splidejs/react-splide/css/core';
import './ProductCardSlider.scss';

const SLIDER_OPTIONS = {
  type: 'loop',
  perPage: 4,
  perMove: 1,
  rewind: true,
  rewindByDrag: true,
  pagination: false,
  gap: '44px',
  breakpoints: {
    1440: {
      perPage: 3,
    },
    1024: {
      perPage: 2,
    },
    768: {
      destroy: true,
    },
  },
};

const ProductCardSlider = ({ items }) => {
  return (
    items.length > 0 && (
      <Splide
        options={SLIDER_OPTIONS}
        hasTrack={false}
        className="products-slider"
      >
        <SplideTrack>
          {items.map((item) => (
            <SplideSlide key={item.title}>
              <ProductCard
                images={item.images}
                title={item.title}
                link={item.link ?? null}
              />
            </SplideSlide>
          ))}
        </SplideTrack>

        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">
            <Image
              src="/img/icons/arrow-left.svg"
              width={19}
              height={31}
              alt="Назад"
            />
          </button>

          <button className="splide__arrow splide__arrow--next">
            <Image
              src="/img/icons/arrow-left.svg"
              width={19}
              height={31}
              alt="Вперед"
            />
          </button>
        </div>
      </Splide>
    )
  );
};

export default ProductCardSlider;
