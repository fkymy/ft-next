import Link from 'next/link';
import Layout from '../components/Layout';

const PatternsPage = () => (
  <Layout title="Patterns">
    <h1>Other patterns (see source code):</h1>
    <div>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </div>
    <div>
      <Link href="/with-sample-data">
        <a>with-sample-data</a>
      </Link>
    </div>
    <div>
      <Link href="/with-sample-data-swr">
        <a>with-sample-data-swr</a>
      </Link>
    </div>
    <div>
      <Link href="/with-vanilla-fetch">
        <a>with-vanilla-fetch</a>
      </Link>
    </div>
    <div className="mt-3">
      <a href="/api/with_sample_data">API: with_sample_data</a>
    </div>
    <div>
      <a href="/api/with_sample_data/profile">API: with_sample_data/profile</a>
    </div>
  </Layout>
);

export default PatternsPage;
