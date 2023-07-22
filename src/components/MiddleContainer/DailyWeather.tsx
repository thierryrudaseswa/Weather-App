import React from 'react';

interface Props {
  day: string;
  icon: number;
  temp: string;
  daysToShow: number;
}

const DailyWeather: React.FC<Props> = ({ day, icon, temp, daysToShow }) => {
  const getClassName = () => {
    if (daysToShow === 5) {
      return 'w-32';
    } else if (daysToShow === 3) {
      return 'w-24';
    }
    // Add any other conditions or default class here if needed
    return 'w-32'; // Default class if none of the conditions match
  };

  return (
    <div
      className={`${getClassName()} mx-1 text-white bg-neutral-900 p-2 rounded-3xl justify-center items-center ${
        daysToShow === 5 ? 'sm:w-16' : daysToShow === 3 ? 'sm:w-8' : 'sm:w-16'
      } sm:p-1 sm:justify-center ${
        daysToShow === 5 ? 'lg:w-24' : daysToShow === 3 ? 'lg:w-6' : 'lg:w-24'
      } lg:p-1`}
    >
      {/* The rest of the component remains unchanged */}
      <div className="truncate day flex justify-center font-bold mx-3 my-2">
        {day}
      </div>
      <div className="w-full h-16 flex justify-center font-thin">______</div>
      <div className="image flex justify-center w-18">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            icon.toString().length > 1 ? icon : `0${icon}`
          }-s.png`}
          alt="rainy"
          className="image rounded-full inset-0 m-4 w-40"
        />
      </div>
      <div className="temp relative text-white text-3xl font-extrabold w-full flex justify-center l top-4">
        {temp}
        <sup className="relative top-2">0</sup>
      </div>
    </div>
  );
};

export default DailyWeather;
