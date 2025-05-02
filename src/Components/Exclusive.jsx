import React from 'react'
import Title from './Title'
import { assets ,exclusiveOffers} from '../assets/assets'

const Exclusive = () => {
  return (
    <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24  xl:px-32 pt-20 pb-20'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title title="Exclusive Offers" subtitle="Discover exclusive offers and discounts on your next stay with us. Book now and save big!" align="left" />
      <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>View All Offers 
        <img src={assets.arrowIcon} alt="" className='group-hover:translate-x-1 transition-all'/>
      </button>
      </div>
      <div>
        {exclusiveOffers.map((offer, index) => (
          <div key={offer._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${offer.image})` }}>
           
              <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>{offer.priceOff}% OFF</p>
              <div>
                <p className='text-2xl font-bold text-gray-800'>{offer.title}</p>
              <p className='text-sm text-gray-500'>{offer.description}</p>
              <p className='text-xl font-bold text-gray-800 mt-2'>Expires {offer.expiryDate}</p>
           
              </div>
              <button>View Offers
                <img src={assets.arrowIcon} alt="" />
              </button>
              
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exclusive
