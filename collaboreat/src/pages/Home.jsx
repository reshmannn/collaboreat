import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/get?listings=true');
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      {/* top */}

      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-xl lg:text-4xl'>
          Discover the particular collaboration opportunity for culinary journey
          right here on CollaborEat
        </h1>
        <div className='text-slate-500 text-m  font-semibold'>
          CollaborEat is an innovative platform designed to streamline
          collaborations between restaurants and bloggers
          <br />
          Restaurants, seeking influential voices to promote their
          establishments and cuisines, can discover and connect with content
          creators whose content aligns with their vision.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Search for restaurants...
        </Link>
      </div>

      {/* swiper */}

      <Swiper navigation>
        {listings &&
          listings.length > 0 &&
          listings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]})  center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-10 my-10'>
        {listings && listings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                All the Restaurants!
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?listings=true'}
              >
                Show more restaurants
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {listings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* listing results */}
    </div>
  );
}
