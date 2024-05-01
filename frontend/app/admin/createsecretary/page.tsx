"use client"
import axios from 'axios';
import {useState} from 'react';

export default function CreateSecretary() {
    
    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [society,setSociety] = useState<string>('')
    const [phoneNo,setPhoneNo] = useState<string>('')

    const handleSubmit = async (e:any)=>{
          e.preventDefault();
          const token = localStorage.getItem('token');
          const url = 'http://localhost:5000/api/v1/CreateSecretary';

          const res = await axios.post(url,{
            name,email,society,phoneNo
          },{
            headers:{
                Authorization:`Bearer ${token}`
            }
          });

          if(res.statusText === "OK"){
               alert('secretary has been created successfully...')
               setEmail('')
               setName('')
               setPhoneNo('')
               setSociety('')
          }
    }

    return (
        <div className='w-full'>
        <div className="w-full  ml-60 mt-10 lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-3xl text-center mb-5">CREATE SECRETARY FOR SOCIETIES</h3>
            <form onSubmit={handleSubmit} className="px-4 lg:px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Secretary's Name
                    </label>
                    <input
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="secretary"
                        type="text"
                        placeholder="Secretary Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Society's Name
                    </label>
                    <input
                        onChange={(e)=>setSociety(e.target.value)}
                        value={society}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="society"
                        type="text"
                        placeholder="Name of the society"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Email
                    </label>
                    <input
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Phone Number
                    </label>
                    <input
                        onChange={(e)=>setPhoneNo(e.target.value)}
                        value={phoneNo}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="tel"
                        placeholder="Mobile number..."
                    />
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register Secretary
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    );
}
