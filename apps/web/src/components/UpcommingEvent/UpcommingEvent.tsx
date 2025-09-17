import { useState } from 'react'
import Countdown from './CountDown'
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcommingEvent = () => {

  const [visible, setVisible] = useState(true);



  if (!visible) return null;

  return (
    <div className='  w-full h-12 flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-600 text-white  sticky top-0 z-50 py-2 '>
      <Link to='/events' className='flex w-fit flex-col md:flex-row justify-center'>
        <div className=' text-xs md:text-xl  font-semibold  px-4' >
          Upcomming Event : Ladies Night
        </div>

        <Countdown />
      </Link>

      <X className=' absolute right-0 h-full flex items-center mx-2 hover:cursor-pointer hover:text-white/75' onClick={() => setVisible(false)} />
    </div>
  )
}

export default UpcommingEvent