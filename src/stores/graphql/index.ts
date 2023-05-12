import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

//const uri = 'http://localhost:4000/graphql';
const uri = 'https://vivecolegios.nortedesantander.gov.co:4100/graphql';
export const urlImages = 'https://vivecolegios.nortedesantander.gov.co:4100/';

const httpLink = createHttpLink({
  uri,
});

const httpLink2 = createUploadLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return token ? {
    headers: {
      ...headers,
      authorization: `Bearer ${token}` ,
    },
  } :{
    headers: {
      ...headers,
    },
  } ;
});

const authLinkUpload = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return token ? {
    headers: {
      ...headers,
      authorization: `Bearer ${token}` ,
      "Content-Type": "multipart/form-data"
    },
  } :{
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data"
    },
  } ;
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },

  assumeImmutableResults: true,
});


export const clientUpload = new ApolloClient({
  link: authLinkUpload.concat(httpLink2 as any) as any,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  assumeImmutableResults: true,
});