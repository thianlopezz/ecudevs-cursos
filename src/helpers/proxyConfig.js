let urlBase = 'http://localhost:3001'

if (process.env.NODE_ENV === 'production') {
  urlBase = 'https://www.ecudevs.com:8081'
} else {
  console.log('We are on ' + process.env.NODE_ENV)
}

export const proxyConfig = {
  url: urlBase
}

export const gqlproxy = {
  url: urlBase + '/graphql'
}
