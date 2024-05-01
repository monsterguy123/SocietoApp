"use client"
import { useEffect, useState } from "react";
import axios from "axios";

type Member = {
   name: string;
   email: string;
   PhoneNo: string;
   society: string;
}

export default function Dashboard() {
  const [secretary, setSecretary] = useState<Member[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:5000/api/v1/getAllSecretary";
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.statusText === "OK") {
          setSecretary(res.data.Secretary);
        }
    };

    fetchData();
  }, []);

  return (
    <div>
        <SocietyMember secretary={secretary} />
    </div>
  );
}

function SocietyMember({ secretary }: { secretary: Member[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Phone No</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Society</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {secretary.length === 0 ? (
            <tr key="no-members" className="text-center text-xl font-medium text-gray-700">
              <td colSpan={5}>No Secretary have joined the Societo App yet.</td>
            </tr>
          ) : (
            secretary.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.PhoneNo}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{item.society.toUpperCase()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
