import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";
import config from "../config.json";

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: config.GRAPHQL_URL,
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
  { getDataFromTree: "ssr" }
);
