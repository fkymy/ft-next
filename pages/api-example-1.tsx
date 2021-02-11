import Layout from '../components/layout'
import { useState } from 'react';
import ViewSource from 'components/view-source';

function ApiExamplesPage() {
  const [endpoint, setEndpoint] = useState('me');
  const [val, setVal] = useState(endpoint);

  return (
    <Layout>
      <div className="hidden md:block">
        <ViewSource pathname=''/>
      </div>
      <div className="mb-8">
        <h1 className="font-semibold text-2xl">42APIテスト1</h1>
        <p className="text-sm"><em>ログインしてないと見れません</em></p>
      </div>
      <div className="inline-flex relative z-10 mb-4">
        <div className="flex items-center bg-gray-200 pl-6 mr-3 pr-12 relative">
          <h1 className="text-sm text-gray-900 font-semibold my-0 leading-8">
            https://api.intra.42.fr/v2/
          </h1>
          <input
            className="bg-transparent focus:outline-none"
            placeholder="me"
            value={val}
            onChange={e => setVal(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-black text-white h-8 py-0 px-5 text-sm border-none cursor-pointer flex items-center justify-center"
            onClick={() => {
              setEndpoint(val);
            }}
          >
            <span className="">Send</span>
          </button>
        </div>
      </div>
      <iframe src={`/api/examples/ft?endpoint=${endpoint}`} />
    </Layout>
  );
}

export default ApiExamplesPage;