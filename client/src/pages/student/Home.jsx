import SearchBar from '../../components/student/SearchBar'
import Hero from '../../components/student/Hero'
import React from 'react'
import Companies from '@/components/student/Companies'

export default function Home() {
  return (
    <div className='max-w-3xl  mx-auto relative left-15 text-2xl mt-30'>
      <Hero/>
      <SearchBar/>
      <Companies/>
    </div>
  )
}
