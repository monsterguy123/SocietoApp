"use client"

export default function Dashboard() {

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Flat No</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Deepak Bisht</td>
            <td className="px-6 py-4 whitespace-nowrap">Deepak@gmail.com</td>
            <td className="px-6 py-4 whitespace-nowrap">B/34</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">Member</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex">
                <a href="#" className="text-red-500 hover:text-red-600" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}