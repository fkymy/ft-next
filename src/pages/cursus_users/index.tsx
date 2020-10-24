import { GetStaticProps } from 'next'
import Link from 'next/link'

import { CursusUser } from '@/src/interfaces'
import { cursusUserData } from '@/cursus_users.ts'
import Layout from '@/src/components/Layout'

type Props = {
  items: CursusUser[]
}

const CursusUsers = ({ items }: Props) => (
  <Layout title="CursusUsers">
    <h1>Cursus Users</h1>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex flex-row">
            <div className="h-32 w-32">
              <img className="" src={`https://cdn.intra.42.fr/users/${item.user.login}.jpg`}/>
            </div>
            <div>
              <p>{item.user.login} | {item.level}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  const items: CursusUser[] = cursusUserData
  return { props: { items } }
}

export default CursusUsers
