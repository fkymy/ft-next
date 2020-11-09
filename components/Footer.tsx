import Link from 'next/link';
import { version } from '../package.json';

const Footer = () => {
  return (
    <footer>
      <hr />
      <span>（フッター）<em>{version}</em></span>
    </footer>
  );
}

export default Footer;