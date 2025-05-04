import React from 'react'
import HomePage from '../HomeComponent/HomePage/Homepage'
import About from '../HomeComponent/About/About'
import Courses from '../HomeComponent/CoursesPage/Courses'
import Contact from '../HomeComponent/Contact/Contact'
import BrandPartners from '../HomeComponent/BrandPatners/Brandpatners'
import CertificatePage from '../HomeComponent/Certificates/Certificates'

export default function Home() {
  return (
    <>
        <HomePage/>
        <About/>
        <Courses/>
        <BrandPartners/>
        <CertificatePage/>
        <Contact/>
        
    </>
  )
}
