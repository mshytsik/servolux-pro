'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import Link from 'next/link';

import '@splidejs/react-splide/css/core';
import styles from './ProductCard.module.scss';
import './ProductCard.scss';

const SLIDER_OPTIONS = {
  type: 'loop',
  perMove: 1,
  rewind: true,
  rewindByDrag: true,
  arrows: false,
  interval: 5000,
};

const ProductCard = ({ images, link = '', title = '', className = '' }) => {
  const sliderOptions = {
    ...SLIDER_OPTIONS,
    clones: images.length > 1,
    drag: !link && images.length > 1,
    autoplay: link && images.length > 1,
  };

  const cardContent = (
    <>
      {images.length > 0 && (
        <Splide
          options={sliderOptions}
          className={`${styles.slider} product-slider`}
        >
          {images.map((image, index) => (
            <SplideSlide key={image}>
              <Image
                className={styles.image}
                src={image}
                width={0}
                height={0}
                sizes="100vw"
                alt={`Продукт #${index}`}
              />
            </SplideSlide>
          ))}
        </Splide>
      )}

      {title && <p className={styles.title}>{title}</p>}
    </>
  );

  return link ? (
    <Link
      href={link}
      className={`${styles.card} ${styles.isLink} ${className}`}
    >
      {cardContent}
    </Link>
  ) : (
    <div className={`${styles.card} ${className}`}>{cardContent}</div>
  );
};

export default ProductCard;
