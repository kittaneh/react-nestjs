import { ApolloClient, InMemoryCache , gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
  });

export function findUsers() {
   return client
   .query({
     query: gql`
       query  {
         users{
            firstname, lastname, email, id
         }
       }
     `
   })
}

export function createUser(user) {

}