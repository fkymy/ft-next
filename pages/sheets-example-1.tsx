import Layout from '../components/layout';
import { useSession } from 'next-auth/client';
import useSheets from 'hooks/useSheets';
import useSWR from 'swr';

import AccessDenied from 'components/access-denied';
import ViewSource from 'components/view-source';

function SheetsExamplePage() {
  const [session, loading] = useSession();

  const { data } = useSWR('/api/examples/sheets');
  if (typeof window !== 'undefined' && loading) return null;
  if (!session) return <Layout><AccessDenied/></Layout>;

  return (
    <Layout>
      <div className="hidden md:block">
        <ViewSource pathname=''/>
      </div>
      <div className="mb-8">
        <h1 className="font-semibold text-2xl">Sheetsテスト1</h1>
        <div className="w-4/5 mx-auto">
          {!data && <>
            <p>loading...</p>
          </>}
          {data && <>
            <tr>
              <th>login</th>
              <th>pool_year</th>
              <th>pool_month</th>
              <th>42Cursus</th>
              <th>Reloaded</th>
              <th>Piscine</th>
            </tr>
            {data.sort((a, b) => (a.level1 > b.level1) ? -1 : 1).map(user => (
              <tr>
                <td>{user.login}</td>
                <td>{user.poolyear}</td>
                <td>{user.poolmonth}</td>
                <td>{user.level1}</td>
                <td>{user.level2}</td>
                <td>{user.level0}</td>
              </tr>
            ))}
          </>}
        </div>
      </div>
    </Layout>
  );
}

// const sheet = '1R1qEfIZDZwkXfqKpCyJZjFtSvEIt9KFUrXHX-3fx_Xs';
const sheet = '1R1qEfIZDZwkXfqKpCyJZjFtSvEIt9KFUrXHX-3fx_Xs';
function SheetsExamplePage2() {
  const [session, loading] = useSession();
  const users = useSheets(sheet);

  // Session
  if (typeof window !== 'undefined' && loading) return null;
  if (!session) return <Layout><AccessDenied/></Layout>;

  if (!users) return <Layout>loading...</Layout>;

  return (
    <Layout>
      <div className="hidden md:block">
        <ViewSource pathname=''/>
      </div>
      <div className="mb-8">
        <h1 className="font-semibold text-2xl">Sheetsテスト1</h1>
        <p className="text-sm"><em>ログインしてないと見れません</em></p>
        <div>
          {!users && <>
            <p>loading...</p>
          </>}
          {users && <>
          {JSON.stringify(users)}
          {/* <ul>{data.map(data => {
            <li>{data}</li>
          })}</ul> */}
          </>}
        </div>
      </div>
    </Layout>
  );
}

export default SheetsExamplePage;