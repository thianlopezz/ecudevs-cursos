// import ApolloClient, { ApolloLink, InMemoryCache } from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { proxyConfig } from '../helpers/proxyConfig'

const httpLink = () =>
  createHttpLink({
    uri: `${proxyConfig.url}/graphql`
  })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`GraphQL Error: ${message}`)
    )
  }
  if (networkError) {
    console.log(`Network Error: ${networkError.message}`)
  }
})

const link = ApolloLink.from([errorLink, httpLink()])

export const client = new ApolloClient({
  link,
  fetch,
  cache: new InMemoryCache()
})
