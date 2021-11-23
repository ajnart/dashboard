export const providers = [
  {
    name: 'google',
    needAuth: true,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://accounts.google.com/o/oauth2/v4/token',
    auth: function() {
        return {
            client_id: '848232511240-73ri3t7plvk96pj4f85uj8otdat2alem.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:3000/auth/google/callback',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
        }
    }
  },
  {
    name: 'youtube kids',
    needAuth: false,
    authUrl: null
  },
  {
    name: 'spotify',
    needAuth: true,
    authUrl: 'https://accounts.spotify.com/authorize'
  },
]

export const getSettings = ({providerName}) => {
  return {
        
  }
}
