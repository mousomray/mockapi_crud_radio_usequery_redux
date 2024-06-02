import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Adduser from './Pages/Adduser';
import Showuser from './Pages/Showuser';
import Edituser from './Pages/Edituser';
import Details from './Pages/Details';

const App = () => {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  const public_routing = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/adduser',
      component: <Adduser />
    },
    {
      path: '/showuser',
      component: <Showuser />
    },
    {
      path: '/edituser/:id',
      component: <Edituser />
    },
    {
      path: '/details/:id',
      component: <Details />
    }
  ]

  return (
    <>
      <ToastContainer />

      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>

        <Router>
          <Routes>
            {public_routing?.map((routing) => {
              return (
                <>
                  <Route path={routing?.path} element={routing?.component} />
                </>
              )
            })}
          </Routes>
        </Router>

      </QueryClientProvider>


    </>
  )
}

export default App
