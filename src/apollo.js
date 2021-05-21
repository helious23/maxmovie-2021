import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const cache = new InMemoryCache();
const link = new createHttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  cache,
  link,
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: () => !isLiked,
          },
        });
      },
    },
  },
});

export default client;
