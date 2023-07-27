import React from "react";
import { RenderBarChart } from "../ColumnChart/ColumnChart";
import MainWeather from "./MainWeather";
import DailyWeather from "./DailyWeather";
import dayjs from "dayjs";
import { useStore } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/getData";
function MiddleContainer() {
  const { location_key } = useStore();
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return getData(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=${process.env.REACT_APP_API_KEY}`
      );
    },
    queryKey: ["data", location_key],
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  console.log(data);

  if (!isLoading) {
    // const epochDates = data.DailyForecasts.map(
    //   (forecast: any) => forecast.EpochDate
    // );
    // const formatedDay = dayjs(epochDates * 1000).format("dddd");

    const daysToShow = window.innerWidth >= 1000 ? 5 : 3;
    return (
      <div
        className="main  flex gap-4
       p-6 relative
      "
      >
        <div className=" relative left    w-3/4">
          <div className="topleft flex  w-11/12 pr-3 pl-0">
            <div className="leftpara   flex flex-1 gap-2 items-center p-2">
              <span className="text-zinc-600 font-bold  b  w-28 flex justify-start cursor-pointer ">
                Today
              </span>
              <span className="text-zinc-600 font-bold cursor-pointer w-28 flex justify-start">
                Tomorrow
              </span>
              <span className="text-zinc-400 font-extrabold cursor-pointer w-28 flex justify-start">
                Next 7 Days
              </span>
            </div>
            <div className=" flex w-64 text-white  right-0 items-center  gap-12 rounded-full bg-neutral-700">
              <div className="forecast flex  bg-blue-300 w-56 rounded-full p-3 items-center  text-zinc-100 justify-center font-semibold cursor-pointer">
                forecast
              </div>
              <div className="Air  font-semibold cursor-pointer w-40 flex justify-end pr-2">
                Air quality
              </div>
            </div>
          </div>
          <div className="middleleft flex gap-2 m-2 ">
            <MainWeather />
            <div className="list flex gap-3 max-w-7xl  ">
              {data !== undefined ? (
                <>
                  {data.DailyForecasts.map((item: any, i: number) => (
                    <DailyWeather
                      day={dayjs(item.Date).format("ddd")}
                      icon={item.Day.Icon}
                      temp={item.Temperature.Minimum.Value}
                      key={i}
                      daysToShow={daysToShow}
                    />
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* rightside */}

        <div className="right flex-2  p-4 w-80 md2:hidden">
          <div className="topright flex">
            <h1 className="font-bold text-amber-50">Chance of rain</h1>
          </div>
          <div className="chart flex my-8 md2:hidden
           ">
            <RenderBarChart />
          </div>
        </div>
      </div>
    );
  } else {
    return <>loading</>;
  }
}

export default MiddleContainer;
