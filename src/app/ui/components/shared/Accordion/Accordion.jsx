'use client';

import { useState, useRef } from 'react';

import Image from 'next/image';

import styles from './Accordion.module.scss';

const Accordion = ({ label, children, className }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className={`${styles.accordion} ${className}`}>
      <div className={styles.head} onClick={() => setOpen((open) => !open)}>
        <p className={styles.label}>{label}</p>

        <Image
          className={open ? styles.open : null}
          src="/img/icons/arrow-left.svg"
          width={19}
          height={31}
          alt="Аккордеон"
        />
      </div>

      <div
        ref={bodyRef}
        className={`${styles.body}`}
        style={{ height: open ? bodyRef.current.scrollHeight : 0 }}
      >
        <div className={`${styles.bodyContent}`}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
