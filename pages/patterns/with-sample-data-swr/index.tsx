import Link from 'next/link';

import Layout from '@components/Layout';

const WithSampleDataSWR = () => (
  <Layout title="with-sample-data-swr">
    <h1>/patterns/with-sample-data-swr</h1>
    <h2>
      https://api.intra.42.fr/v2/cursus/21/cursus_users?filter[campus_id]=26&sort=-blackholed_at&page[size]=100
    </h2>
    <Link href="/patterns">
      <a>Go back to patterns</a>
    </Link>
    <div>
      <p>/patterns/with-sample-data-swr</p>
    </div>
  </Layout>
);

export default WithSampleDataSWR;
