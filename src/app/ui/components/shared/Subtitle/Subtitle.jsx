import { inter } from '@/app/ui/fonts';
import styles from './Subtitle.module.scss';

const Subtitle = ({ name, headingSize = 2, className = '' }) => {
  const HeadingTag = `h${headingSize}`;

  return (
    <HeadingTag
      className={`${styles.subtitle} ${inter.className} ${className}`}
    >
      {name}
    </HeadingTag>
  );
};

export default Subtitle;
