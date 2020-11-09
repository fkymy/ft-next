import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from 'styles/Header.module.css';

const Header = () => {
  const [ session, loading ] = useSession();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>このサイトを観覧するには42生としてログインする必要があります。</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn('42')
                }}
              >
                ログイン
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>{session.user.name}</small><br/>
              <strong>{session.user.displayName}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                ログアウト
              </a>
          </>}
        </p>
      </div>
      <nav>
        <ul className="list-none mt-4 mb-8">
          <li className="inline-block mr-4 text-blue-700 hover:text-blue-900"><Link href="/"><a>Home</a></Link></li>
          <li className="inline-block mr-4 text-blue-700 hover:text-blue-900"><Link href="/api-examples"><a>API1</a></Link></li>
          <li className="inline-block mr-4 text-blue-700 hover:text-blue-900"><Link href="/api-examples2"><a>API2</a></Link></li>
          <li className="inline-block mr-4 text-blue-700 hover:text-blue-900"><Link href="/patterns"><a>Patterns</a></Link></li>
          {/* <li className="inline-block mr-4 text-blue-700 hover:text-blue-900"><Link href="/sheets1"><a>Sheets1</a></Link></li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
