import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from "react-router-dom"


const QUERY_ALL_MOVIEWS = gql`
    query GetAllMoviews {
        moviews {
            id 
            name
            yearOfPublication
        }
    }
`;

const QUERY_MOVIEW_BY_NAME = gql`
    query Moview($name: String!) {
      moview(name: $name){
        id
        name
        yearOfPublication
      }
    }
`;

export const Moview = () => {
  const { data: moviewData, } = useQuery(QUERY_ALL_MOVIEWS);
  const [moviewName, setMoviewName] = useState("");
  const [fetchMoview, { data: moviewNameData, error: moviewNameError }] = useLazyQuery(QUERY_MOVIEW_BY_NAME)

  if(moviewNameError){
    console.log(moviewNameError)
    return <h1>Error whiler searching for the data</h1>
  }
  return (
    <div>
      <h1>Moview Data </h1>

      <div className="home_btn">
        <Link to={"/user"}>
          <button>User</button>
        </Link>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>



      <p>
        {moviewData && moviewData.moviews.map((moview) => {
          return (
            <div key={moview.id}>
              <h3>Name: {moview.name}</h3>
              <h3>YearOfPublication: {moview.yearOfPublication}</h3>
            </div>
          )
        })}
      </p>

      <div>
        <input type='text' placeholder='enter moview name' onChange={(e) => setMoviewName(e.target.value)} />
        <button onClick={() => {
          fetchMoview({
            variables: {
              name: moviewName
            }
          })
        }}>Search</button>
        <div>  
          {moviewNameData && (
            <div> 
              <h1>Moview Name: {moviewNameData.moview.name}</h1>
              <h1>Moview yearOfPublication: {moviewNameData.moview.yearOfPublication}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}