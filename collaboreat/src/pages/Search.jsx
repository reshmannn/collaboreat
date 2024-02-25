import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    reviews: false,
    sponsoredContent: false,
    giveaways: false,
    events: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const reviewsFromUrl = urlParams.get('reviews');
    const sponsoredContentFromUrl = urlParams.get('sponsoredContent');
    const giveawaysFromUrl = urlParams.get('giveaways');
    const eventsFromUrl = urlParams.get('events');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      reviewsFromUrl ||
      sponsoredContentFromUrl ||
      giveawaysFromUrl ||
      eventsFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        reviews: reviewsFromUrl === 'true',
        sponsoredContent: sponsoredContentFromUrl === 'true',
        giveaways: giveawaysFromUrl === 'true',
        events: eventsFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();

      // Check if searchQuery is empty
      if (searchQuery.trim() !== '') {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        setListings(data);
      } else {
        // Handle the case where searchQuery is empty
        setListings([]);
      }

      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'reviews' ||
      e.target.id === 'sponsoredContent' ||
      e.target.id === 'giveaways' ||
      e.target.id === 'events'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('reviews', sidebardata.reviews);
    urlParams.set('events', sidebardata.events);
    urlParams.set('giveaways', sidebardata.giveaways);
    urlParams.set('sponsoredContent', sidebardata.sponsoredContent);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className=''>
            <label className='font-semibold'> Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full '
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Collaboration Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='reviews'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.reviews}
              />
              <span>Reviews</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sponsoredContent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.sponsoredContent}
              />
              <span>Sponsored Content</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='giveaways'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.giveaways}
              />
              <span>Giveaways</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='events'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.events}
              />
              <span>Events</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Filter:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
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
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Restaurants available:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'> No restaurants found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}
