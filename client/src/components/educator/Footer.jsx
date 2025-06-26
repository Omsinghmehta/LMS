import { assets } from '@/assets2/assets'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:px-8 bg-gray-200/50 max-sm:gap-y-10 '>
      <div className='flex justify-center items-center md:flex-row flex-col'>
        <img src={assets.learnify} className=' md:h-30 md:w-auto h-30 w-auto'/>
        <p className='text-xs md:text-base text-gray-500 text-center'>Copyright 2025 &copy; Learnify, All right reserved.</p>
      </div>
      <div className="flex flex-row  gap-2  max-sm:pb-10">

        <a href="#"><img className="max-sm:h-6 w-auto" src={assets.facebook_icon} alt="" /></a>
        <a href="#"><img className="max-sm:h-6 w-auto"  src={assets.twitter_icon} alt="" /></a>
        <a href="#"><img className="max-sm:h-6 w-auto"  src={assets.instagram_icon} alt="" /></a>
       

      </div>
    </div>
  )
}
