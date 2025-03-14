import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateJob = () => {
  const [startDate, setStartDate] = useState(new Date())
  const navigate = useNavigate();
  
  const { id } = useParams();

  const [updatePost, setUpdatePost] = useState({});
  


  const { _id, job_title, job_description, maxPrice, minPrice, category, bids, employeInfo } = updatePost;


  // const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUpdatePost();
  }, [id])

  const fetchUpdatePost = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/update-jobs/${id}`);
    setUpdatePost(data);
    setStartDate(new Date(data.deadline));
  }


  /// updated my posted jobs from database --------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = e.target;
    const job_title = from.job_title.value;
    const deadline = startDate;
    const category = from.category.value;
    const minPrice = from.min_price.value;
    const maxPrice = from.max_price.value;
    const job_description = from.description.value;

    const updateInfo = {
      job_title,
      deadline: startDate,
      category,
      minPrice,
      maxPrice,
      job_description,
    }
    // console.log(updateInfo);

    // / post the data in the database 

    const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/update-post/${id}`, updateInfo);
    // console.log(data);

    if (data.modifiedCount) {
      from.reset();
      alert('Your bid has been Updated successfully');
      navigate(`/my-posted-jobs`);
    }
    if (!data.modifiedCount) {
      alert('Your are not changed anything');
    }

  }

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Update a Job
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                type='text'
                defaultValue={job_title}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
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
                defaultValue={employeInfo?.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

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
              {category ? (
                <select
                  name="category"
                  id="category"
                  defaultValue={category}
                  className="border p-2 rounded-md"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Graphics Design">Graphics Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              ) : (
                <p>Loading category...</p>
              )}

            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                defaultValue={minPrice}
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                defaultValue={maxPrice}
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
              defaultValue={job_description}
              id='description'
              cols='30'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob
