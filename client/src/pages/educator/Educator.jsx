import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Educator() {
  return (
   
    <div>
       <div>Educator</div>
       <div>
        {<Outlet/>}
       </div>
    </div>
  )
}
