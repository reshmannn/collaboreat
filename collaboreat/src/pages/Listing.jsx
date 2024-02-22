import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'> Something went wrong :( </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat `,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - Rs.{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>

            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <h3 className='text-slate-700 font-semibold '>
              Collaboration type
            </h3>
            <ul className='text-slate-800 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.sponsoredContent ? 'No sponsors' : 'Sponsers'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.reviews ? 'No reviews' : 'Reviews'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.giveaways ? 'No giveaway' : 'Giveaways'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.events ? 'No events' : 'Events'}
              </li>{' '}
            </ul>
            <button
              onClick={() => setContact(true)}
              className='bg-green-800 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
            >
              Contact Restaurant
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
