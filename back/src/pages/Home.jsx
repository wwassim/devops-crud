import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3000/users")
        .then((res)=>res.data)
        .then((result)=>setData(result))
        .catch(err=>console.log("error->",err))
    },[])
  
  return (
    <div className="overflow-x-auto">
        <div className="flex flex-col items-start mt-[150px]">
        <Link to={`/create`} className='border my-4  mx-auto border-orange-700 text-orange-700 px-4 py-2 rounded-xl '>create new +</Link>
      <table className="max-w-[1000px] w-full mx-auto  bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
              >
                id
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
              >
                Name
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
              >
                LastName
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
              >
                Actions
              </th>
          </tr>
        </thead>
        <tbody>
            {data.map((element,index)=>(
                <tr  className="even:bg-[#f9fafb] ">
                <td
                  className="py-2 px-4 border-b border-gray-200 text-gray-800"
                >
                        {element.id}
                </td>
                <td
                  className="py-2 px-4 border-b border-gray-200 text-gray-800"
                >
                    {element.name}
                </td> 
                 <td
                  className="py-2 px-4 border-b border-gray-200 text-gray-800"
                >
                    {element.lastName}
                </td>
                <td className='flex space-x-4 items-center '>
                    <Link to={`/page-details/${element.id}`} className='border border-blue-700 text-blue-700 px-4 py-2 rounded-xl'>Read</Link>
                    <Link to={`/update/${element.id}`} className='border border-green-700 text-green-700 px-4 py-2 rounded-xl'>Update</Link>
                    <Link to='/'className='border border-red-700 text-red-700 px-4 py-2 rounded-xl' >Delete</Link>
                </td>
            </tr>
            ))}
            
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Home