import Image from 'next/image';
import Button from './ui/components/shared/Button/Button';

import styles from './page.module.scss';

export const metadata = {
  title: 'Ошибка 404',
  description: 'Ошибка 404',
};

export default function Error() {
  return (
    <div className={styles.notFound}>
      <Image
        className={`${styles.image} hide-mobile`}
        src="/img/images/main-banner-desktop.jpg"
        fill
        alt="Ошибка 404"
      />

      <Image
        className={`${styles.image} hide-desktop`}
        src="/img/images/main-banner-mobile.jpg"
        fill
        alt="Ошибка 404"
      />

      <div className="container">
        <div className={`${styles.content} container__content`}>
          <h1 className={styles.title}>404</h1>

          <Button
            name="Вернуться на главную"
            link="/"
            isLarge
            className={styles.button}
          />
        </div>
      </div>
    </div>
  );
}
