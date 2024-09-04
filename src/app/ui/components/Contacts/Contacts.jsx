import Subtitle from '../shared/Subtitle/Subtitle';
import { sanitizePhone } from '@/app/lib/utils';
import { fetchTeam } from '@/app/lib/api';

import styles from './Contacts.module.scss';

const Contact = ({ person }) => {
  return (
    <div className={styles.person}>
      <p className={styles.name}>{person.name}</p>
      <p className={styles.position}>{person.position}</p>

      {(person.email.length || person.phone.length) && (
        <ul className={styles.contactsList}>
          {person.email.map((email) => (
            <li key={email}>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          ))}
          {person.phone.map((phone) => (
            <li key={phone}>
              <a href={`tel:${sanitizePhone(phone)}`}>{phone}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Contacts = async () => {
  const team = await fetchTeam();

  return (
    <div className={styles.contacts}>
      <Subtitle className={styles.subtitle} name="Контакты" />

      <div className={`row ${styles.row}`}>
        <div className={`${styles.block} col col-8 col-lg-12`}>
          {team.slice(0, 4).map((person) => (
            <Contact person={person} key={person.id} />
          ))}
        </div>

        <div className={`${styles.block} col col-4 col-lg-12`}>
          {team.slice(4).map((person) => (
            <Contact person={person} key={person.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
