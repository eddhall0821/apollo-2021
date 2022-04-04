import { makeVar } from "@apollo/react-hooks";
// import  from "apollo-boost";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

// export const currentUserVar = makeVar([]);
export const testsVar = makeVar([]);
export const isLoggedInVar = makeVar(!!localStorage.getItem("token"));

export const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        user: {
          read() {
            // return currentUserVar();
          },
        },
      },
    },
  },
});
const link = createUploadLink({ uri: "http://localhost:4000/" });
const contextSetter = (_, { headers }) => {
  // const token = currentUserVar()?.token | localStorage.getItem("token");
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
};

const client = new ApolloClient({
  link: setContext(contextSetter).concat(link),
  uri: "http://localhost:4000/",
  cache,
  // cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
  },
});

export default client;
