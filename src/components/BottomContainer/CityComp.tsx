import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/getData";

const CityComp: React.FC<{
  loc_key: string;
  country: string;
  city: string;
}> = ({ loc_key, city, country }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["city_current", loc_key],
    queryFn: () => {
      return getData(
        `http://dataservice.accuweather.com/currentconditions/v1/${loc_key}?apikey=${process.env.REACT_APP_API_KEY}&details=true`
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });
  if (!isError && !isLoading) {
    return (
      <>
        <div className="cities bg-neutral-900 rounded-3xl my-3">
          <div className="city flex flex-row  h-28 m-1">
            <div className="capital basis-2/3  m-3 p-3 h-24">
              <h1 className="font-light text-white ">{country}</h1>
              <h1 className="font-bold text-lg text-white ">{city} </h1>
              <p className="font-semibold text-xs my-1 text-white ">
                {" "}
                {data[0].WeatherText}
              </p>
            </div>
            <div className="temp basis-1/3  flex justify-center items-center h-24 m-3">
              <div className="cloudimage rounded-full">
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${
                    data[0].WeatherIcon.toString().length > 1
                      ? data[0].WeatherIcon
                      : `0${data[0].WeatherIcon}`
                  }-s.png`}
                  className="w-12 h-10 my-2 rounded-full"
                  alt=""
                />
                {/* <img src="/image/rainy.jpg" className="w-12 h-12 my-2" alt="" /> */}
                <h1
                  className="
                     flex justify-center font-extrabold text-white "
                >
                  {data[0].Temperature.Metric.Value}
                  <sup className="top-2">0</sup>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full flex justify-center items-center text-xl font-semibold p-5">
        Loading...
      </div>
    );
  }
};

export default CityComp;
