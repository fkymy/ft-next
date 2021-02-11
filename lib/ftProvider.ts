export default function (options) {
  return {
    id: '42',
    name: '42',
    type: 'oauth',
    version: '2.0',
    scope: 'public',
    params: { grant_type: 'authorization_code' },
    accessTokenUrl: 'https://api.intra.42.fr/oauth/token',
    authorizationUrl: 'https://api.intra.42.fr/oauth/authorize?response_type=code',
    profileUrl: 'https://api.intra.42.fr/v2/me',
    profile: (profile) => {
      return {
        id: profile.id,
        name: profile.login,
        email: profile.email,
        image: `https://cdn.intra.42.fr/users/small_${profile.login}.jpg`,
      }
    },
    ...options
  }
}