import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom"
import { CreateUser } from './reusable/CreateUser';
import { useState } from 'react';


const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id 
            name 
            age
            username
        }
    }
`;

const QUERY_GET_USER = gql`
    query GetUser($userId: ID!) {
        user(id: $userId){
            id
            name
            friends{
                name
            }
        }
    }
`

// const  QUERY_ALL_USERS = gql`
//    query GetAllUsers {
//     users {
//         ...on UsersSuccessfulResult{
//             users {
//                 id
//                 name
//                 age
//                 username
//             }
//         }

//         ...on UsersErrorResult {
//             message
//         }
//     }
//    }
// `;
const QUERY_ALL_MOVIEWS = gql`
    query GetAllMoviews {
        moviews {
            id 
            name
            yearOfPublication
        }
    }
`;

export const User = () => {
    const [userId, setUserId] = useState("")
    const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
    const {
        data: singleUserData,
        loading: singleUserLoading,
        error: singleUserError,
        refetch: singleUserRefetch } = useQuery(QUERY_GET_USER, { variables: { userId } })

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (data) {
        console.log(data)
    }
    if (error) {
        console.log(error)
    }
    return (
        <div>

            <CreateUser refetch={refetch} />
            <h1>User Data</h1>

            <div className="home_btn">
                <Link to={"/"}>
                    <button>Home</button>
                </Link>
                <Link to={"/moview"}>
                    <button>Moview</button>
                </Link>
            </div>



            {data && data.users.map((user) => {
                return (
                    <div key={user.id} className='flex gap-20'>
                        <p>{user.id}</p>
                        <p className='gap-20'>Name: {user.name}</p>
                        <p>Username: {user.username}</p>
                        <p>Age: {user.age}</p>
                    </div>
                )
            })}

            <h2>Get User By Id</h2>

            <input type='number' placeholder='enter yours id' onChange={(e) => setUserId(e.target.value)} />

            <button onClick={singleUserRefetch}>Click to  search a user</button>

            {singleUserData && (
                <div> 
                   <p>Name: {singleUserData.user.name}</p>
                </div>
            )}

        
        </div>
    )
};