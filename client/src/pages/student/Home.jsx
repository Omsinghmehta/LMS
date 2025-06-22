import SearchBar from '../../components/student/SearchBar'
import Hero from '../../components/student/Hero'
import React from 'react'
import Companies from '@/components/student/Companies'
import CourseSection from '@/components/student/CourseSection'
import TestimonialSection from '@/components/student/TestimonialSection'
import CallToAction from '@/components/student/CallToAction'
import Footer from '@/components/student/Footer'

export default function Home() {
  return (
    <div className='  mt-15 md:mt-[8rem] min-w-screen min-h-screen '>
      <Hero/>
      <SearchBar/>
      <Companies/>
      <CourseSection/>
      <TestimonialSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}
