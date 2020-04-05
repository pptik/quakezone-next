import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import appConfig from '../appConfig.json';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: appConfig.GRAPHQL_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      request: operation => {
        //const token = localStorage.getItem('token')
        //const token = STRAPI_TOKEN;
        const token = undefined;
        operation.setContext({
          fetchOptions: {
            // credentials: "include"
          },
          headers: {
            authorization: token ? `Bearer ${token}` : undefined
          }
        });
      }
    }),
  // { getDataFromTree: "ssr" }
);
