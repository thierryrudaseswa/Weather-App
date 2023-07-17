interface Props {
  day: string;
  icon: number;
  temp: string;
}

const DailyWeather: React.FC<Props> = ({ day, icon, temp }) => {
  return (
    <div className="one w-32 mx-1  text-white  bg-neutral-900  p-2  rounded-3xl justify-center items-center sm:w-16 sm:p-1 sm:justify-center ">
      <div className="day flex justify-center font-bold  mx-3 my-2  ">{day}</div>
      <div className=" w-full h-16 flex justify-center font-thin ">______</div>
      <div className="image flex justify-center w-18">
        <img
           src={`https://developer.accuweather.com/sites/default/files/${
            icon.toString().length > 1
              ? icon
              : `0${icon}`
          }-s.png`}
          alt="rainy"
          className="image rounded-full  inset-0 m-4 w-40 "
        />
        {/* <img
          src="/image/rainy.jpg"
          alt="rainy"
          className="image rounded-full  inset-0 m-4 w-12 "
        /> */}
      </div>
      <div className="temp relative text-white text-3xl font-extrabold   w-full flex justify-center l top-4 ">
        {temp}
        <sup className="relative top-2">0</sup>
      </div>
    </div>
  );
};

export default DailyWeather;
