import Layout from '../components/Layout'

export default function Page () {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl">42APIテスト</h1>
        <p><em>ログインしてないと見れません</em></p>
      </div>
      <h2 className="text-lg">プロフィール</h2>
      <p>https://api.intra.42.fr/v2/me</p>
      <iframe src="/api/examples/me"/>

      <h2 className="text-lg">Cursus Users</h2>
      <p>https://api.intra.42.fr/v2/cursus/21/cursus_users?filter[campus_id]=26&sort=-blackholed_at</p>
      <iframe src="/api/examples/cursus_users"/>

      {/* <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session"/>
      <h2 className="text-lg">JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe src="/api/examples/jwt"/> */}
    </Layout>
  )
}