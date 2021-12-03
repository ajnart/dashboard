import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import { OauthSender, OauthReceiver } from 'react-oauth-flow';

export const providers = [
  {
    name: 'youtube',
    needAuth: true,
    send: () => {
      return googleSend()
    },
    receive: ({ handleSuccess, handleError }) => {
      return googleReceive({ handleSuccess, handleError })
    },
    check: ({ token }) => {
      return googleCheck({ token })
    },
    refresh: function() {
    }
  },
  {
    name: 'gmail',
    needAuth: true,
    send: () => {
      return googleSend()
    },
    receive: ({ handleSuccess, handleError }) => {
      return googleReceive({ handleSuccess, handleError })
    },
    check: ({ token }) => {
      return googleCheck({ token })
    },
    refresh: function() {
    }
  },
  {
    name: 'youtube kids',
    needAuth: false,
    // authUrl: null
    send: () => {
      return {}
    },
    receive: ({/* handleSuccess, handleError */}) => {
      return {}
    },
    check: ({/* token */}) => {
      return {}
    },
    refresh: function() {
    }
  },
  {
    name: 'spotify',
    needAuth: true,
    // authUrl: 'https://accounts.spotify.com/authorize'
    send: () => {
      return {}
    },
    receive: ({/* handleSuccess, handleError */}) => {
      return {}
    },
    check: ({/* token */}) => {
      return {}
    },
    refresh: function() {
    }
  },
  {
    name: 'deezer',
    needAuth: true,
    // authUrl: 'https://accounts.spotify.com/authorize'
    send: () => {
      return {}
    },
    receive: ({/* handleSuccess, handleError */}) => {
      return {}
    },
    check: ({/* token */}) => {
      return {}
    },
    refresh: function() {
    }
  },
]

const googleSend = () => {
  return (
    <OauthSender
      // {...this.props}
      authorizeUrl="https://accounts.google.com/o/oauth2/v2/auth"
      clientId="297024806589-igr7j5qh2l2jbd5vt10ok0goj5ghevbn.apps.googleusercontent.com"
      redirectUri="http://localhost:3000/oauth/google"
      args={{
        scope: "https://www.googleapis.com/auth/youtube https://mail.google.com/",
        client_id: "297024806589-igr7j5qh2l2jbd5vt10ok0goj5ghevbn.apps.googleusercontent.com"

      }}
      render={({ url }) => <Link href={url}><Button>Connection</Button></Link>}
    />
  )
}

const googleReceive = ({ handleSuccess, handleError }) => {
  return (
    <OauthReceiver
      tokenUrl="https://oauth2.googleapis.com/token"
      clientId="297024806589-igr7j5qh2l2jbd5vt10ok0goj5ghevbn.apps.googleusercontent.com"
      clientSecret="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"
      redirectUri="http://localhost:3000/oauth/google"
      onAuthSuccess={handleSuccess}
      onAuthError={handleError}
      render={({ processing, state, error }) => (
        <div>
          {processing && <p>Authorizing now...</p>}
          {error && (
            <p className="error">An error occurred: {error.message}</p>
          )}
        </div>
      )}
    />
  )
}

const googleCheck = ({ token }) => {
  return new Promise((resolve, reject) => {
    fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token)
      .then(_ => {
        resolve(true)
      })
      .catch(_ => {
        reject(false)
      })
  })
}
