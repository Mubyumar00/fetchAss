import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10')
        setData(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        setError("Couldn't get data from API", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="bg-indigo-100 min-h-screen p-5">
    <h1 className='text-4xl font-medium mb-5 text-center'>Users Profile Data</h1>
      <div className="mb-4">
      <div className='flex justify-center items-center'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      </div>
      {data && data.length > 0 && (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((user) => (
            <div className='flex items-center rounded-md p-6 bg-gray-300 gap-3 overflow-hidden'>
            <img className='rounded-md h-36' src={user.picture.medium} alt="User Image" />
            <div key={user.id}>
              <h2><b>Name:</b> {user.name.title} {user.name.first} {user.name.last}</h2>
              <p><b>Location:</b> {user.location.street.number} {user.location.street.name}, {user.location.country}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>
            </div>
         </div>
          ))}
       </div>
      )}
      </div>
   </div>
  )
}

export default App