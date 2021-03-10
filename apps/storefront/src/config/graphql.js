import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
const links = {
    strapi: new HttpLink({
        uri: "http://0.0.0.0:1337/graphql",
        credentials: "same-origin",
        cors: {
          origin: "*",
          resource: '*',
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: false,
          optionsSuccessStatus: 204,
          credentials: true
        }
    }),
    shop: new HttpLink({ uri: 'http://0.0.0.0:3000/shop-api', credentials: 'include' })
};
const link = new ApolloLink(operation => {
    const definition = getMainDefinition(operation.query);
    let endpoint = 'shop';
    if ('operation' in definition) {
        const foundDirective = definition.directives?.find(item =>
            Object.keys(links).includes(item.name.value)
        );
        if (foundDirective) {
            endpoint = foundDirective.name.value;
            // remove the directive from the request
            operation.query.definitions[0].directives = operation.query.definitions[0].directives.filter(
                dir => dir.name.value !== endpoint
            );
            // operation.query.loc.source.body = operation.query.loc.source.body.replace(
            //     `@${endpoint} `,
            //     ''
            // );
        }
    }
    return links[endpoint].request(operation);
});

const defaultOptions = {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
}

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  });