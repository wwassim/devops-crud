import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProfileDetail = () => {
  const params = useParams()
  const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/users/${params.id}`)
        .then((res)=>res.data)
        .then((result)=>setData(result))
        .catch(err=>console.log("error->",err))
    },[])
  return (
    <div className='flex w-full h-screen justify-center items-center bg-[#f9fafb]'>
      <div className="mx-auto bg-white w-[400px] h-[200px] flex flex-col border border-gray-300 px-6 py-4 rounded-xl">
        
        <h1 className='text-[18px] font-semibold'>User FirstName : {data.name} </h1>
        <h3 className=' font-medium'>User LastName : {data.lastName} </h3>
      </div>
    </div>
  )
}

export default ProfileDetail