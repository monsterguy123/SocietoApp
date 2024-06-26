"use client"
import { useEffect, useState } from "react";
import axios from "axios";

type Member = {
   name: string;
   email: string;
   PhoneNo: string;
   FlatNo: string;
}

export default function Dashboard() {
  const [member, setMember] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = "http://localhost:5000/api/v1/societyMembers";
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.statusText === "OK") {
          setMember(res.data.members);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <SocietyMember member={member} />
      )}
    </div>
  );
}

function SocietyMember({ member }: { member: Member[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Flat No</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Phone No.</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {member.length === 0 ? (
            <tr key="no-members" className="text-center text-xl font-medium text-gray-700">
              <td colSpan={5}>No members have joined the Societo App yet.</td>
            </tr>
          ) : (
            member.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.FlatNo}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{item.PhoneNo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
