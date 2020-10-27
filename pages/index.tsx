import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="42API">
    <h1>Hello 42API 👋</h1>
    <p>
      <Link href="/patterns">
        <a>Patterns</a>
      </Link>
    </p>
    <div>
      <p>TODO</p>
    </div>
  </Layout>
);

export default IndexPage;
