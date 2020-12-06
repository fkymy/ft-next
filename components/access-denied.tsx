import { signIn } from 'next-auth/client';

export default function AccessDenied() {
  return (
    <>
      <p>
        <a href="/api/auth/signin"
           onClick={(e) => {
             e.preventDefault();
             signIn('42');
           }}
          >
            このページを観覧するには42生としてログインする必要があります。
          </a>
      </p>
    </>
  )
}