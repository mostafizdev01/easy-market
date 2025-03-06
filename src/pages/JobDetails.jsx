import axios from 'axios'
import { format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const JobDetails = () => {
  const [startDate, setStartDate] = useState(new Date())
  const { id } = useParams();
  const [job, setJob] = useState({});
  const  { user } = useContext(AuthContext);
  
  
  const { _id, job_title, job_description, deadline, maxPrice, minPrice, category, bids, employeInfo } = job;

  useEffect(() => {
    fetchSingleJobs()  // Call your API here to fetch data related to the job details.
  }, [id])

  const fetchSingleJobs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
    setJob(data);
  }

  const deadlineDate = job?.deadline ? format(new Date(job.deadline), "dd/MM/yyyy") : "No Deadline";

  /// post the jobd job from the database 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = e.target;
    const price = from.price.value;
    const comment = from.comment.value;
    // const deadline = from.startDate;
    
    const bidInfo = {
      price,
      email: user?.email,
      comment,
      deadline: startDate
    }

    /// post the data in the database 
    
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/bid-job`, bidInfo);
    if (data) {
      alert("Your bids was successfully")
    }
    
  }

  return (
    <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-light text-gray-800 '>
            Deadline: {deadlineDate}
          </span>
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            {category}
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>
            {job_description}
          </p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>
                Name: {employeInfo?.name}
              </p>
              <p className='mt-2 text-sm  text-gray-600 '>
              {employeInfo?.email}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img
                src={employeInfo?.photo}
                alt=''
              />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Range: ${minPrice} - ${maxPrice}
          </p>
        </div>
      </div>

      {/* Place A Bid Form */}

      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
                required
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                defaultValue={user?.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default JobDetails
