import React from 'react';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from '../App';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
