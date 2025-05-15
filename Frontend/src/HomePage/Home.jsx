import React from 'react'
import HomePage from '../HomeComponent/HomePage/Homepage'
import Courses from '../HomeComponent/CoursesPage/Courses'
import Contact from '../HomeComponent/Contact/Contact'
import BrandPartners from '../HomeComponent/BrandPatners/Brandpatners'
import CertificatePage from '../HomeComponent/Certificates/Certificates'

export default function Home() {
  return (
    <>
        <HomePage/>
        <Courses/>
        <BrandPartners/>
        <CertificatePage/>
        <Contact/>
        
    </>
  )
}
