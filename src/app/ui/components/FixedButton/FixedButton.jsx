'use client';

import { useRef, useEffect } from 'react';

import Button from '../shared/Button/Button';

import styles from './FixedButton.module.scss';

const FixedButton = ({ name, link, download = false }) => {
  const buttonRef = useRef();

  useEffect(() => {
    const width = buttonRef.current.offsetWidth;
    const height = buttonRef.current.offsetHeight;
    buttonRef.current.style.transform = `translate(${height}px, -${
      width / 2
    }px) rotate(90deg)`;
    buttonRef.current.style.opacity = 1;
  }, []);

  return (
    <div ref={buttonRef} className={styles.container}>
      <Button
        className={styles.button}
        name={name}
        link={link}
        download={download}
      />
    </div>
  );
};

export default FixedButton;
