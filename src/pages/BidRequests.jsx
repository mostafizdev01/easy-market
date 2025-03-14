import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { format } from "date-fns";

const BidRequests = () => {


  const [myRequest, setMyRequest] = useState([]);
  // console.log(myRequest);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchAllPost();
  }, [])

  const fetchAllPost = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/my-bids/${user?.email}?buyer=true`);
    setMyRequest(data);
  }

  /// change tha status for the jobs -------

  const changeStatus = async (id, prevStatus, status) => {
    console.table({id, prevStatus, status});
    if(prevStatus === status || prevStatus === "Completed") return;
  }

  return (
    <section className='container px-4 mx-auto my-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {myRequest.length} Requests
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Email</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Category
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Status
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* table body starting here now  */}

                <tbody className='bg-white divide-y divide-gray-200 '>
                  {
                    myRequest.map((request, index) => (
                      <tr key={index}>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                          {request.job_title}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                          {request?.email}
                        </td>

                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {format(new Date(request.deadline), "dd/MM/yyyy")}
                        </td>

                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                          ${request.price}
                        </td>
                        <td className='px-4 py-4 text-sm whitespace-nowrap'>
                          <div className='flex items-center gap-x-2'>
                            <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
                            {request.category}
                            </p>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                          <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500'>
                            <span className='h-1.5 w-1.5 rounded-full bg-green-500'></span>
                            <h2 className='text-sm font-normal '>{request.status}</h2>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-sm whitespace-nowrap'>
                          <div className='flex items-center gap-x-6'>
                            <button onClick={()=> changeStatus(request._id, request.status, "In Progress")} className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-5 h-5'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='m4.5 12.75 6 6 9-13.5'
                                />
                              </svg>
                            </button>

                            <button onClick={()=> changeStatus(request._id, request.status, "Reject")} className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-5 h-5'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BidRequests
