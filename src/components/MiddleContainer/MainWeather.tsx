import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useStore } from "../../store";
import { getData } from "../../utils/getData";
const MainWeather: React.FC = () => {
  const { location_key } = useStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data_current", location_key],
    queryFn: () => {
      return getData(
        `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${process.env.REACT_APP_API_KEY}&details=true`
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });
  if (!isLoading && !isError) {
    const epochTime = 1688805420;
    // const formattedTime =dayjs(epochTime * 1000).format('HH:mm');
    const formattedTime = dayjs(epochTime * 1000).format("h:mm A");
    const formattedDay = dayjs(epochTime * 1000).format("dddd");
    return (
      <div className="large w-[16rem] bg-emerald-300 rounded-3xl flex  flex-col  sm:w-[12rem] sm:p-4   xl:w-[14rem] xl:p-2 ">
        <div className="flex justify-between bg-emerald-400 rounded-t-3xl items-center py-2 w-full h-20 px-3  sm:flex  sm:justify-start sm:p-0 sm:w-32  md:flex md:justify-start md:p-0 md:w-36 xl:flex xl:justify-start xl:p-0 xl:w-40">
          <p className="text-xl text-black font-bold sm:text-sm  sm:mx-4 md:text-sm md:mx-5 xl:text-xl xl:mx-6">
            {formattedDay}
          </p>
          <p className="text-xl text-black font-bold sm:text-sm md:text-sm xl:text-sm ">
            {formattedTime}
          </p>
        </div>
        <div className="w-full grid grid-cols-2  h-56 rounded-b-3xl p-3 ">
          <div className=" w-60 h-48">
            <div className="flex ">
              <div className="text-6xl flex justify-center items-center font-bold w-32  h-24 sm:text-xl sm:w-16 sm:h-16   md:text-sm md:w-20 md:h-16 xl:text-lg xl:w-20">
                {data[0].Temperature.Metric.Value}
                <sup
                  className="text-xl
                    mx-1 sm:m-0 md:text-sm xl:text-lg"
                >
                  0
                </sup>
              </div>
              <div className="image  w-24 h-28 flex items-center  sm:w-16 sm:h-16 md:w-16 md:h-16 xl:h-20 xl:w-20">
                {/* {data[0].WeatherIcon} */}
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${
                    data[0].WeatherIcon.toString().length > 1
                      ? data[0].WeatherIcon
                      : `0${data[0].WeatherIcon}`
                  }-s.png`}
                  alt="thierry"
                  className="image rounded-full bg-cover w-72"
                />
                {/* <img
                  src="/sunny.png"
                  alt="thierry"
                  className="image rounded-full bg-cover w-72"
                /> */}
              </div>
            </div>
            <div className="datacontainer flex  sm:block  md:block md:h-36 md:w-32 xl:block  ">
              <div className="weatherdata w-32  ">
                <p className="text-gray-600 text-sm font-medium ">
                  Real Feel:{" "}
                  <span className="text-black">
                    {data[0].RealFeelTemperature.Metric.Value}
                    <sup>0</sup>{" "}
                  </span>
                </p>
                <p className="text-gray-600 text-sm font-medium">
                  Wind: {data[0].Wind.Direction.English}:{" "}
                  <span className="text-black">
                    {data[0].Wind.Speed.Metric.Value}{" "}
                    {data[0].Wind.Speed.Metric.Unit}
                  </span>
                </p>
                <p className="text-gray-600 text-sm font-medium">
                  Pressure:{" "}
                  <span className="text-black">
                    {data[0].Pressure.Metric.Value}{" "}
                    {data[0].Pressure.Metric.Unit}
                  </span>
                </p>
                <p className="text-gray-600 text-sm font-medium">
                  Humidity:{" "}
                  <span className="text-black">
                    {data[0].RelativeHumidity} %
                  </span>
                </p>
              </div>
              <div className=" relative top-7 h-9   w-24 sm:top-4 xl:top-1">
                <p className="text-gray-600 text-xs font-medium">
                  Sunrise: <span className="text-black"> 5:40Am</span>
                </p>
                <p className="text-gray-600 text-xs font-medium">
                  Sunrise: <span className="text-black"> 6:32Am</span>
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center items-center text-xl font-semibold p-5">
        Loading...
      </div>
    );
  }
};

export default MainWeather;
