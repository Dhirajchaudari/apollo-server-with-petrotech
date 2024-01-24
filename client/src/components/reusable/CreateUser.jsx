import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
   mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input){
        id
        name
    }

   }
`


export const CreateUser = ({refetch}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("")
    const [age, setAge] = useState("");
    const [nationality, setNationality] = useState("");

    const [createUserFunc] = useMutation(CREATE_USER)
    return (
        <div>
          <h1>Create User</h1>

          <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <input type="number" placeholder="age" onChange={(e) => setAge(e.target.value)} />
          <input type="text" placeholder="nationality" onChange={(e) => setNationality(e.target.value.toUpperCase())} />

          <button onClick={() => {
            createUserFunc({variables: {input: {name, username, age: Number(age), nationality}}
            })
            refetch()
          }}>Create User</button>
        </div>
    )
}