import SearchBar from '../../components/student/SearchBar'
import Hero from '../../components/student/Hero'
import React from 'react'
import Companies from '@/components/student/Companies'
import CourseSection from '@/components/student/CourseSection'

export default function Home() {
  return (
    <div className='  mt-[8rem] min-w-screen min-h-screen m-0 p-0'>
      <Hero/>
      <SearchBar/>
      <Companies/>
      <CourseSection/>

    </div>
  )
}
