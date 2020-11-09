import { signIn } from 'next-auth/client';

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a href="/api/auth/signin"
           onClick={(e) => {
             e.preventDefault();
             signIn('42');
           }}>You must be signed in to view this page</a>
      </p>
    </>
  )
}

//https://api.intra.42.fr/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2F42&scope=public&state=2d61ea042fb86685be7367a77e39ec5424e2a7ff5df0f8f0e2c4d7e16e7a4ae2&client_id=6bd032554e7dfcf8063ec2d2ae1a8f08f3208d5e2da260de33b95154380c468b