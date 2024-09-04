'use client';

import { scrollToSection } from '@/app/lib/utils';

import Image from 'next/image';
import Button from '../shared/Button/Button';
import Search from '../shared/Search/Search';

import { inter } from '../../fonts';
import styles from './MainBanner.module.scss';

const MainBanner = ({
  image,
  imageMobile = null,
  title = '',
  buttonName = '',
  buttonLink = '',
  buttonType = '',
  isSearch = false,
}) => {
  const handleButtonClick = (e) => {
    e.preventDefault();
    scrollToSection(buttonLink.split('#')[1]);
  };

  return (
    <div className={`${styles.banner} ${isSearch ? styles.isSearch : ''}`}>
      <div className="container">
        <div className="container__content">
          <div className="row">
            <div
              className={`${styles.content} col ${
                isSearch ? 'col-12' : 'col-10 col-sm-12'
              }`}
            >
              <Image
                src={image}
                width={0}
                height={0}
                sizes="100vw"
                className={`${styles.background} ${
                  imageMobile && 'hide-mobile'
                }`}
                alt={image.alt ?? title}
              />

              {imageMobile && (
                <Image
                  src={imageMobile}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={`${styles.background} hide-desktop`}
                  alt={imageMobile.alt ?? title}
                />
              )}

              {title && (
                <p className={`${styles.title} ${inter.className}`}>{title}</p>
              )}

              {isSearch ? (
                <Search
                  placeholder="Поиск по сайту..."
                  className={styles.search}
                />
              ) : (
                <Button
                  name={buttonName}
                  link={buttonLink}
                  isLarge
                  onClick={buttonType === 'scroll' ? handleButtonClick : null}
                  download={buttonType === 'download'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
