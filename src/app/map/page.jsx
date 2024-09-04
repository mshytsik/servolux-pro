import { fetchShops } from '@/app/lib/api';

import MainBanner from '@/app/ui/components/MainBanner/MainBanner';
import Subtitle from '@/app/ui/components/shared/Subtitle/Subtitle';
import Image from 'next/image';
import Button from '@/app/ui/components/shared/Button/Button';
import FixedButton from '../ui/components/FixedButton/FixedButton';

import styles from './page.module.scss';

export const metadata = {
  title: 'Карта продаж',
  description: 'Карта продаж Servolux Professional',
};

export default async function Page() {
  const shops = await fetchShops();

  return (
    <>
      <MainBanner
        image="/img/images/map-banner-desktop.jpg"
        imageMobile="/img/images/main-banner-mobile.jpg"
        title="Карта продаж"
        buttonName="Смотреть каталог"
        buttonLink="/#catalog"
      />

      <div className={`${styles.container} container`}>
        <div className="container__content">
          <div className="row">
            <div className="col col-4 col-sm-12">
              <Subtitle name="Карта продаж" />

              <ul className={styles.list}>
                {shops.map((shop, index) => (
                  <li key={shop.id}>
                    {index + 1}. {shop.title} - {shop.address}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col col-8 col-sm-12">
              <Image
                className={styles.image}
                src="/img/images/map.svg"
                width={0}
                height={0}
                sizes="100vw"
                alt="Карта продаж"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container hide-desktop">
        <div className="container__content">
          <Button
            name="Скачать каталог"
            link="#"
            isLarge
            download
            className={styles.download}
          />
        </div>
      </div>

      <FixedButton name="Скачать каталог" link="#" download />
    </>
  );
}
