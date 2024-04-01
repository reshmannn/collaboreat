import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextInput } from 'flowbite-react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-800 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link
          to='/'
          className='self-center whitespace-nowrap text-sm sm:text-xl
          font-semibold dark:text-white'
        >
          <span className='px-2 py-1 bg-gradient-to-r from-pink-600 to-orange-500 rounded-lg text-white'>
            CollaborEat
          </span>
        </Link>
        <div className='flex'>
          <TextInput
            type='text'
            placeholder='Search...'
            className=' lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='button'
            className='text-slate-200 hover:text-white ml-2'
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className=' hidden sm:inline text-slate-200 hover:underline'>
              Home
            </li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-200 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
