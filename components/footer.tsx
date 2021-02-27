import Link from 'next/link';
import styles from './footer.module.css';
import { version } from '../package.json';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr />
      <span>（フッター）</span>
      <ul className={styles.navItems}>
        <li className={styles.navItem}><Link href="/"><a>Github</a></Link></li>
        <li className={styles.navItem}><Link href="/"><a>Policy</a></Link></li>
        <li className={styles.navItem}><em>{version}</em></li>
      </ul>
    </footer>
  );
}

export default Footer;