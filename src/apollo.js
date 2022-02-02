import { makeVar } from "@apollo/react-hooks";
// import  from "apollo-boost";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const testsVar = makeVar([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tests: {
          read() {
            return testsVar();
          },
        },
      },
    },
  },
});
const link = createUploadLink({ uri: "http://localhost:4000/" });

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/",
  // cache,
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
  },
});

export default client;
