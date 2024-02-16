import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* top */}

      <div className=''>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-600'> perfect </span>
          <br />
          collaboration with ease
        </h1>
      </div>
      <div className='text-gray-400 text-xs sm:text-sm'>
        Find Restaurants to collaborate with
      </div>
      <Link
        to={'/search'}
        className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
      >
        Lets start now...
      </Link>

      {/* swiper */}

      {/* listing results */}
    </div>
  );
}
