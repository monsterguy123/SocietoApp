"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const ContactForm = () => {
  
  const [name,setName] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [phoneNo,setPhoneNo] = useState<string>('')
  const [society,setSociety] = useState<string>('')
  const [Message,setMessage] = useState<string>('')
  
  const SubmitHandler = async(e:any)=>{
      e.preventDefault();
    const token = localStorage.getItem('token');
      const url = "http://localhost:5000/api/v1/SecretaryApplication";
      const res = await axios.post(url,{
        name,email,phoneNo,society,Message
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(res){
         setEmail('')
         setMessage('')
         setName('')
         setPhoneNo('')
         setSociety('')
      }
  }

  return (
    <div className="my-6 w-full">
      <div className="grid justify-between sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-full bg-white  rounded-md text-[#333] font-[sans-serif]">
        <div className="text-center w-[70%] ml-20">
          <h1 className="text-4xl font-extrabold ">Are you the secretary of the society?</h1>
          <p className="text-lg text-gray-400 mt-3">Plz send the application to the SuperAdmin to register your society and get your id and password to your email</p>
        </div>

        <form onSubmit={SubmitHandler} className="space-y-4 ml-5 w-[80%]">
          <input onChange={e=>setName(e.target.value)} value={name} type='text' name="name" placeholder='Name...' className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <input onChange={e=>setEmail(e.target.value)} value={email} type='text' name="email" placeholder='email...' className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <input onChange={e=>setPhoneNo(e.target.value)} value={phoneNo} type='text' name='phoneNo' placeholder='phoneNo...' className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <input onChange={e=>setSociety(e.target.value)} value={society} type='text' placeholder='society...' name='society...' className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <textarea onChange={e=>setMessage(e.target.value)} value={Message} placeholder='Message...'  name='message' className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></textarea>
          <button type="submit" className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full">Send</button>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <img className="w-20 h-20" src="https://appsnstuff.com/img/portfolio_images/devices/socity-management/socity-management-logo.png"/>
            <h1 className="max-w-2xl mb-4 text-4xl font-serif leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              THE SOCIETO APP
            </h1>
            <h1 className="max-w-2xl mb-4 text-2xl font-serif text-gray-500 leading-none tracking-tight md:text-2xl-text-gray-400 xl:text-2xl dark:text-white">
              Empower your society with efficient management through Societo, streamlining tasks, fostering community engagement, and simplifying communication for seamless organization.
            </h1>
            <div className="max-w-2xl mb-4 text-2xl font-serif text-gray-700 leading-none tracking-tight md:text-2xl md:text-gray-700 xl:text-2xl dark:text-white">
              Are you a Member of a society or the Secretary?<br />
              <Link href={'/signin'}>
                <button className="bg-blue-400 hover:bg-blue-600 mt-3 text-white font-bold py-2 px-4 rounded">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://houstonagentmagazine.com/wp-content/uploads/sites/7/2021/02/Race_Homeownership_Illustration-scaled.jpg" alt="hero image" />
          </div>
        </div>
      </section>
      <br />
      <ContactForm />
    </div>
  );
}
