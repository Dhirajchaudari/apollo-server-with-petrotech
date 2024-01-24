import {UserList, MovieList} from '../FakeData.js';

import _ from 'lodash'
export const resolvers = {
    Query : {
        users:(parent, args, context) =>{
            // console.log(context.req.headers)
            // if(UserList) return {users: UserList}

            // return {message: "Hey there is a error"}
            return UserList
        },
        user:(parent, args) => {
            const id = args.id
            const user = _.find(UserList, {id: Number(id)});
            return user
        },

        moviews: () => {
            return MovieList
        },

        moview : (parent, args) => {
            const name = args.name;
            const moview = _.find(MovieList, {name});
            return moview
        }
    },
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList, (moview) => moview.yearOfPublication >= 2000 && moview.yearOfPublication <= 2010)
        }
    },
    Mutation: {
        createUser: (parent, args, context) => {
            const pubsub = context.pubSub;
            // console.log(context)
            const user = args.input;
            const lastId = UserList[UserList.length -1].id;
            user.id = lastId + 1
            UserList.push(user)
            pubsub.publish("NEW_USER_ADDED", {
                newUser: user
            })
            return user

        },
        updateUsername: (parent, args) => {
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if(user.id === Number(id)){
                    user.username = newUsername
                    userUpdated = user
                }
            })
            return userUpdated;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null
        }
    },
    Subscription: {
        newUser: async (parent, args, context) => {
            const pubsub = context.pubSub;
            return pubsub.asyncIterator("NEW_USER_ADDED")

        }
    }
    // UsersResult: {
    //     __resolveType(obj) {
    //         if(obj.users){
    //             return "UsersSuccessfulResult"
    //         }

    //         if(obj.message){
    //             return "UsersErrorResult"
    //         }

    //         return null
    //     }
    // }
}