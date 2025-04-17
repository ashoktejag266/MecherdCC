
import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen container'>
          <Header/>
          <Outlet/>
        </main>
        {/* <div className='p-10 text-center bg-gray-800 mt-10'>
          All rights reserved @MCC 2025
        </div> */}


      <div className="p-10 text-center bg-gray-800 mt-10 flex justify-center items-center space-x-6">
        <p className="text-white">All rights reserved @MCC 2025</p>

        {/* Social Media Links */}
        <div className="flex space-x-4 ml-4">
          <a href="https://www.linkedin.com/company/mecherd/" target="_blank" rel="noopener noreferrer">
            <img src="social/ln.svg" alt="LinkedIn" className="h-6 w-6" />
          </a>
          <a href="https://wa.me/918073541928?text=Hi,%20I%20would%20like%20to%20connect%20with%20you%20to%20discuss%20further" target="_blank" rel="noopener noreferrer">
            <img src="social/wa.svg" alt="WhatsApp" className="h-6 w-6" />
          </a>
          <a href="mailto:support@mecherd.com">
            <img src="social/mail.svg" alt="Email" className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/mecherd.career.connect?igsh=MTNmN2g5cHJuaThjag==" target="_blank" rel="noopener noreferrer">
            <img src="social/insta.svg" alt="Instagram" className="h-6 w-6" />
          </a>
        </div>
      </div>



        
    </div>
  )
}

export default AppLayout