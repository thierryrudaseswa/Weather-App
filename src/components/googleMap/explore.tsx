import React from 'react'


function Explore() {
  return (
    <div className=' w-52 h-60   bg-gradient-to-br from-blue-200 to-blue-600 rounded-3xl text-slate-800 py-2 shadow-slate-700p-6 md2:w-32 md2:h-44 md2:text-xs'>
        <div className="">
        <div className="words text-xs flex justify-center items-center h-16 text-blac md2:h-10 "><div className="one h-14  w-40 font-bold md2:h-8 md2:w-24  "><span  className='px-4 md2:px-0 '>Explore global map </span> <span className='md2:hidden'>wind,weather and oceans</span> <span className='px-12 md2:px-0 md2:hidden'>conditions</span> </div></div>
        <div className="image h-20 flex justify-center ">
        <img
                src="ocean.jpg"
                alt="thierry"
                className="h-20 w-44 bg-cover bg-no-repeat rounded-3xl md2:h-16 m-2 md2:w-28"
              />
        </div>
        <div className="button  flex justify-center items-center h-20 md2:h-12">
          <button className='w-44 bg-slate-500 font-bold text-sm h-10 rounded-full md2:w-28 md2:h-6'>Get started</button>
        </div>
        </div>
    </div>
  )
}

export default Explore;