import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React from 'react'
import { Link } from 'react-router-dom';
import companies from '../data/companies.json'
import faq from '../data/faq.json'
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@radix-ui/react-accordion';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useUser } from '@clerk/clerk-react';

import EnquiryForm from '@/components/enquiry-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";



const LandingPage = () => {
  const {user}= useUser();

  return (
    <main className='flex flex-col gap-10 sm:gap:20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:8xl tracking-tighter py-4'>
          Find Your Dream Team <span className='flex items-center gap-2 sm:gap-6'>HERE!!!
             </span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
        Explore countless job opportunities tailored for you or connect with top-tier talent—effortlessly.
        </p>
      </section>  

      <div className='flex gap-6 justify-center'>
        <Link to="/jobs">
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>

        {/* Show "Post a Job" only if user is NOT a candidate */}
        {user?.unsafeMetadata?.role !== "candidate" && (
          <Link to="/post-job">
            <Button variant="destructive" size="xl">
              Post a Job
            </Button>
          </Link>
        )}
      </div>


      

      <p className= 'text-center sm:mt-4 text-s sm:text-2xl font-semibold'>
        Our Valued Partners</p>

      

      <Carousel
        loop
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full py-10 overflow-hidden"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.concat(companies).map(({ name, id, path }, index) => (
            <CarouselItem key={index} className="basis-1/3 lg:basis-1/6">
              <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      

      {/* banner */}
      <img src='banner.png' className='w-full opacity-75'/>

      

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Seekers Card */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-between text-justify">
            <p>
              Find your dream job here! 🚀 Register now to explore exciting career opportunities tailored to your skills and aspirations. Get job alerts, industry insights, and direct access to top employers. Your next big career move starts here!
            </p>
            <div className="flex justify-center items-center mt-4">
              <a href="https://forms.office.com/r/isUPYme1de" target="_blank" rel="noopener noreferrer">
                <Button variant="blue">Find Jobs</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Employers Card */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-between text-justify">
            <p>
              Find the best talent solutions here! 🎯 Whether you're looking for bulk hiring, RPO, or specialized recruitment, we provide efficient, customized solutions to meet your workforce needs. Let us help you build a strong, skilled team for your business success!
            </p>
            {/* <div className="flex justify-center items-center mt-4">
              <a href="https://forms.office.com/r/zedAV3qsmq" target="_blank" rel="noopener noreferrer">
                <Button variant="destructive">Enquire Now</Button>
              </a>
            </div> */}

            <div className="flex justify-center items-center mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Enquire Now</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enquiry Form</DialogTitle>
                  </DialogHeader>
                  <EnquiryForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </section>


     

      <Card>
        <CardHeader>
          <CardTitle className="font-bold">About Us</CardTitle>
        </CardHeader>
        <CardContent className="text-justify">
          Mecherd Career Connect is not just a recruitment firm; we are redefining the future of talent acquisition with cutting-edge HR tech solutions. Our mission is to bridge the gap between job seekers and employers by offering seamless, efficient, and innovative hiring processes. We empower professionals with career-enhancing opportunities while enabling businesses to find the right talent effortlessly. By integrating technology, personalized outreach, and deep industry insights, we ensure that both job seekers and employers experience a recruitment journey that is transparent, efficient, and results-driven.
        </CardContent>

        <CardHeader>
          <CardTitle className="font-bold">Our Journey</CardTitle>
        </CardHeader>
        <CardContent className="text-justify">
          Our story began in 2018 as a Mechanical Consulting Firm specializing in engineering solutions. Like many businesses, we faced unprecedented challenges during the COVID-19 pandemic, pushing us to rethink our direction. Instead of stepping back, we pivoted—focusing on helping engineers become job-ready through skill development and career coaching. This shift revealed a larger gap in the recruitment landscape, inspiring us to build a tech-driven HR solution. Today, Mecherd Career Connect stands as a trusted partner for both job seekers and employers, driving opportunities, optimizing hiring, and transforming how talent connects with the right opportunities.
        </CardContent>
      </Card>


      {/* Accordion */}
     
      <Accordion type="multiple" className="w-full">
      <h6 className="font-bold text-2xl ">Frequently  Asked  Questions</h6>
      
        {faq.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>


    </main>
  )
}

export default LandingPage;