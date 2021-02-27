import Link from 'next/link';
import Layout from '../../components/layout';

function PatternsPage() {
  return (
    <Layout title="Patterns">
      <h1>Other patterns (see source code):</h1>
      <div>
        <Link href="/patterns/with-sample-data">
          <a>with-sample-data</a>
        </Link>
      </div>
      <div>
        <Link href="/patterns/with-sample-data-swr">
          <a>with-sample-data-swr</a>
        </Link>
      </div>
      <div>
        <Link href="/patterns/with-client-credentials">
          <a>with-client-credentials</a>
        </Link>
      </div>
      <div>
        <Link href="/patterns/with-authorization-code">
          <a>with-authorization-code</a>
        </Link>
      </div>
    </Layout>
  );
} 

export default PatternsPage;
