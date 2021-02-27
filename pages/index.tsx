import Layout from '@components/layout';
import ViewSource from '../components/view-source';

function IndexPage() {
  return (
    <Layout>
      <div className="hidden md:block">
        <ViewSource pathname=''/>
      </div>
      <h1 className="font-semibold text-2xl">Hello 42API</h1>
    </Layout>
  );
}

export default IndexPage;
