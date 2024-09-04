import Image from 'next/image';
import Subtitle from '../shared/Subtitle/Subtitle';

import styles from './ImageBanner.module.scss';

const ImageBanner = ({
  title,
  image,
  isLargeImage = false,
  isImageInline = true,
  isDark = false,
  children,
}) => {
  return (
    <div
      className={`${styles.banner} ${isDark ? styles.isDark : ''} ${
        isImageInline ? styles.isImageInline : ''
      }`}
    >
      <div className="container">
        <div className="container__content">
          <div className={`row ${styles.row}`}>
            <div
              className={`${styles.content} col col-${
                isImageInline ? 7 : 8
              } col-sm-12`}
            >
              <Subtitle className={`${styles.title}`} name={title} />

              <p className={styles.description}>{children}</p>
            </div>

            <div
              className={`${styles.image} col-${
                isImageInline ? 5 : 4
              } col-sm-12`}
            >
              <Image
                className={`${isLargeImage ? styles.isLarge : ''}`}
                src={image}
                width={0}
                height={0}
                sizes="100vw"
                alt={image.alt ?? title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
