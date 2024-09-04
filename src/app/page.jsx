import { fetchCategories } from '@/app/lib/api';

import Link from 'next/link';
import MainBanner from './ui/components/MainBanner/MainBanner';
import ImageBanner from './ui/components/ImageBanner/ImageBanner';
import Subtitle from './ui/components/shared/Subtitle/Subtitle';
import ProductCardSlider from './ui/components/ProductCardSlider/ProductCardSlider';
import Button from './ui/components/shared/Button/Button';
import Contacts from './ui/components/Contacts/Contacts';
import FixedButton from './ui/components/FixedButton/FixedButton';

import styles from './page.module.scss';

export default async function Page() {
  const categories = await fetchCategories();

  const sliderCategories = categories.map((item) => ({
    ...item,
    link: `/category/${item.slug}`,
    images: [item.image],
  }));

  return (
    <>
      <MainBanner
        image="/img/images/main-banner-desktop.jpg"
        imageMobile="/img/images/main-banner-mobile.jpg"
        title="Servolux Professional – готовые решения для бизнеса"
        buttonName="Смотреть каталог"
        buttonLink="#catalog"
        buttonType="scroll"
      />

      <div id="about">
        <ImageBanner
          image="/img/images/food.png"
          isLargeImage
          isImageInline={false}
          title="О нас"
        >
          <strong>Продукция бренда SERVOLUX PROFESSIONAL</strong> – это синергия
          уникального опыта и широких компетенции команды технологов и экспертов
          в области производства Республики Беларусь, которые воплотили лучшие
          мировые практики в области выращивания цыплят-бройлеров и переработки
          мяса птицы.
          <br />
          Весь ассортимент SERVOLUX PROFESSIONAL специально разработан под
          потребностей канала Horeca и с учетом требований профессиональной
          кухни.
          <br />
          <br />
          Более 20 лет опыта от компании SERVOLUX
        </ImageBanner>
      </div>

      <div className={`${styles.cards} container`} id="catalog">
        <div className="container__content">
          <Subtitle name="Каталог" className={styles.cardsTitle} />

          <ProductCardSlider items={sliderCategories} />

          <Button
            name="Скачать каталог"
            link="#"
            isLarge
            download
            className={`${styles.cardsButton} hide-desktop`}
          />
        </div>
      </div>

      <div id="distribution">
        <ImageBanner
          image="/img/images/distribution.jpg"
          isLargeImage
          title="Дистрибуция"
          isDark
        >
          <strong>SERVOLUX PROFESSIONAL</strong> надёжный поставщик продуктов
          питания для разного формата заведений канала HoReCa – от малого
          бизнеса и до партнерства с KFC, Ростикс, DODO и других.
          <br />
          <br />
          Долгосрочные контракты с крупнейшими дистрибуторскими компаниями по
          всей территории Российской Федерации, Республики Беларусь, Российской
          Федерации и ближнего зарубежья – страны средней Азии: Казахстан,
          Узбекистан, Кыргызстан, Таджикистан, Азербайджан, Грузия и Армения.
          <br />
          <br />
          <Link href="/map">
            <strong>Карта продаж</strong>
          </Link>
        </ImageBanner>
      </div>

      <div className="container" id="contacts">
        <div className="container__content">
          <Contacts />
        </div>
      </div>

      <FixedButton name="Скачать каталог" link="#" download />
    </>
  );
}
