import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { client } from "../config/graphql";

export default (App) => {
  class AppWithApollo extends React.Component {
    render() {
      const { apollo } = this.props;
      return (
        <ApolloProvider client={apollo}>
          <App {...this.props} />
        </ApolloProvider>
      );
    }
  }

  return withApollo(() => {
    return client
  })(AppWithApollo);
};
