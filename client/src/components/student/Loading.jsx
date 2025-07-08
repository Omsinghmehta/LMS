import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Loading() {
  const {path} = useParams();
  const navigate=useNavigate();
  useEffect(()=>{
    if(path){
      const timer=setTimeout(() => {
        navigate(`/${path}`)
      }, 5000);

      return ()=>clearTimeout(timer)
    }
  },[])
  return (
    <div className='min-h-[60vh] flex justify-center items-center'>
      <div className= 'w-16 md:w-20 rounded-full aspect-square border-5 border-gray-300 border-t-5 border-t-blue-500 animate-spin '>
        
      </div>
    </div>
  )
}
