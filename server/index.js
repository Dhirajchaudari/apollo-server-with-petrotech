import { ApolloServer} from 'apollo-server'
import {typeDefs} from './schema/type-defs.js';
import {resolvers} from './schema/resolvers.js';
import { PubSub } from 'graphql-subscriptions'


const pubSub = new PubSub();

const server = new ApolloServer({typeDefs, resolvers, context: ({req}) => {
    return {name: "dhiraj", req, pubSub}
}})

server.listen().then(({url}) => {
    console.log(`Server listening on ${url}`)
});

// const subscriptionServer = SubscriptionServer.create(
//     {
//         execute,
//         subscribe
//     },
//     {
//       server: server,
//       path: '/graphql',
//     },
//   );

