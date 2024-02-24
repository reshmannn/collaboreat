import React from 'react';

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
          <div className=''>
            <label className='font-semibold'> Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full '
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Collaboration Type:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='reviews' className='w-5' />
              <span>Reviews</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='sponsoredContent' className='w-5' />
              <span>Sponsored Content</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='giveaways' className='w-5' />
              <span>Giveaways</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='events' className='w-5' />
              <span>Events</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Filter:</label>
            <select id='sort_order' className='border rounded-lg p-3'>
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1> Restaurants available: </h1>
      </div>
    </div>
  );
}
