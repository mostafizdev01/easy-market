import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AuthContext } from '../providers/AuthProvider'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const AddJob = () => {
  const [startDate, setStartDate] = useState(new Date())
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //// post the data useing the useMutation from the transtact query 

  const { isPending, mutateAsync } = useMutation({  /// nicher from data value gula mutateAsync er mordhe rakha hoise
    mutationFn: async jobData => { /// mutateAsync er data gula jobData er mordhe rakha hoise
      await axios.post(`${import.meta.env.VITE_API_URL}/add-job`, jobData); /// jobData post kortese and ekhane to call kortesi aita to bujha jaitese..
    },
    onSuccess: () => { // jodi data ta thik moto post hoi taile ata call hobe 
      queryClient.invalidateQueries({queryKey: ['jobs']})  // mane ami joto new data add korsi sei gula tumi abar fetch kore niya aiso...
      console.log("data saved") // refetch the data after successful mutation
      navigate('/my-posted-jobs')
    },
    onError: () => { // jodi data ta thik moto post nai hoi taile ata call hobe
      alert("Failed to post your job")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = e.target;
    const employeInfo = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL
    };
    const job_title = from.job_title.value;
    const deadline = startDate;
    const category = from.category.value;
    const minPrice = from.min.value;
    const maxPrice = from.max.value;
    const job_description = from.description.value;

    const fromData = { job_title, deadline, category, minPrice, maxPrice, job_description, employeInfo, bids: 0 };

    // API call to add job to database

    // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/add-job`, fromData); ===>>> old job posting rules
    // if (data.insertedId) {
    //   alert("Your Post was successfully")
    // }


    // new job posting useing the transtract query  

    mutateAsync(fromData); // new job posting rules

  }



  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Post a Job
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                required
                id='job_title'
                name='job_title'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                required
                id='emailAddress'
                type='email'
                defaultValue={user?.email}
                disabled={true}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
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

            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700 ' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                id='category'
                className='border p-2 rounded-md'
              >
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                required
                id='min_price'
                name='min'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                required
                id='max_price'
                name='max'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 ' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              required
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              {isPending ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob
