import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './App.css';
import { User } from './components/User';
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home';
import { Moview } from './components/Moview';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache,
    uri: 'http://localhost:4000/graphql'
  })

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/moview' element={<Moview />} />
      </Routes>
    </ApolloProvider>
  )
}

export default App
