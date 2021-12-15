import React, { useState, useEffect } from 'react';
import { Button, Link } from '@chakra-ui/react';
import { OauthSender, OauthReceiver } from 'react-oauth-flow';
import axios from 'axios'
import qs from 'qs'

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
    receive: ({/* handleSuccess, handleError */ }) => {
      return {}
    },
    check: ({/* token */ }) => {
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
      return (
        <OauthSender
          // {...this.props}
          authorizeUrl="https://accounts.spotify.com/authorize"
          clientId="df46dbf01ae440299ce85efae7c95693"
          redirectUri="http://localhost:3000/oauth/spotify"
          args={{
            scope: "user-read-private user-read-email",
          }}
          render={({ url }) => <Link href={url}><Button>Connection</Button></Link>}
        />
      )
    },
    receive: ({ handleSuccess, handleError, code }) => {
      const [isLoading, setIsLoading] = useState(true)
      const [error, setError] = useState("")
      useEffect(() => {
        axios({
          method: 'post',
          url: "https://accounts.spotify.com/api/token",
          data: qs.stringify({
            code: code,
            redirect_uri: "http://localhost:3000/oauth/spotify",
            grant_type: "authorization_code"
          }),
          headers: {
            'Authorization': 'Basic ' + btoa("df46dbf01ae440299ce85efae7c95693" + ':' + "c7d80d3ff56f4c83887f01b647fe5794"),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            setIsLoading(false)
            handleSuccess(res.data)
          })
          .catch(err => {
            setIsLoading(false)
            handleError(err.message)
            setError(err.message)
          })
      }, [])
      return (
        <div>
          {isLoading && <p>Authorizing now...</p>}
          {
            error && (
              <p className="error">An error occurred: {error}</p>
            )
          }
        </div >
      )
    },
    check: ({/* token */ }) => {
      return new Promise((resolve, _) => {
        resolve(true)
      })
    },
    refresh: function() {
    }
  },
  {
    name: 'github',
    needAuth: true,
    send: () => {
      return (
        <OauthSender
          // {...this.props}
          authorizeUrl="https://github.com/login/oauth/authorize"
          clientId="Iv1.a23c1baab59f9147"
          redirectUri="http://localhost:3000/oauth/github"
          args={{
            scope: "repo user",
          }}
          render={({ url }) => <Link href={url}><Button>Connection</Button></Link>}
        />
      )
    },
    receive: ({ handleSuccess, handleError, code }) => {
      const [isLoading, setIsLoading] = useState(true)
      const [error, setError] = useState("")
      useEffect(() => {
        axios({
          method: 'post',
          url: "https://github.com/login/oauth/access_token",
          data: qs.stringify({
            code: code,
            redirect_uri: "http://localhost:3000/oauth/github",
            client_id: "Iv1.a23c1baab59f9147",
            client_secret: "0503c16ee56754a6eceb9241184e2dfe07252254"
          }),
          headers: {
            'Accept': 'application/json'
          }
        })
          .then(res => {
            setIsLoading(false)
            handleSuccess(res.data)
          })
          .catch(err => {
            setIsLoading(false)
            handleError(err.message)
            setError(err.message)
          })
      }, [])
      return (
        <div>
          {isLoading && <p>Authorizing now...</p>}
          {
            error && (
              <p className="error">An error occurred: {error}</p>
            )
          }
        </div >
      )
    },
    check: ({/* token */ }) => {
      return new Promise((resolve, _) => {
        resolve(true)
      })
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
        scope: "https://www.googleapis.com/auth/youtube https://mail.google.com/ https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",

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
    axios.get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token)
      .then(_ => {
        resolve(true)
      })
      .catch(_ => {
        reject(false)
      })
  })
}
