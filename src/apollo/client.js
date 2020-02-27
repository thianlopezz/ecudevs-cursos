import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: 'http://52.21.208.11:3002/graphql',
  fetch
})
