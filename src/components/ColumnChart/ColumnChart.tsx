import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useStore } from "../../store";
import { getData } from "../../utils/getData";
import { useState } from "react";
import moment from "moment";
const data = [
  { name: "10AM", uv: 100, pv: 2400, amt: 2400 },
  { name: "11AM", uv: 90, pv: 2400, amt: 2400 },
  { name: "12AM", uv: 40, pv: 2400, amt: 2400 },
  { name: "10AM", uv: 100, pv: 2400, amt: 2400 },
];

export const RenderBarChart: React.FC = () => {
  const { location_key } = useStore();
  const [chartData, setChartData] = useState<{ name: string; uv: number }[]>(
    []
  );
  const { isLoading, isError } = useQuery({
    queryKey: ["chart_data", location_key],
    queryFn: () => {
      return getData(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location_key}?apikey=${process.env.REACT_APP_API_KEY}&details=true`
      );
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess(data) {
      setChartData(
        data.map(
          (d: { EpochDateTime: moment.MomentInput; Rain: { Value: any } }) => ({
            name: moment(d.EpochDateTime).format("hh A"),
            uv: d.Rain.Value,
          })
        )
      );
    },
  });
  if (!isLoading && !isError) {
    return (
      <BarChart width={350} height={250} data={chartData}>
        <XAxis dataKey="name" axisLine={false} />
        <YAxis axisLine={false} />
        {/* <Tooltip /> */}
        <CartesianGrid stroke="#fff" strokeDasharray="5" vertical={false} />
        <Bar dataKey="uv" fill="#ccc" barSize={5} />
      </BarChart>
    );
  } else {
    return (
      <div className="w-full flex justify-center items-center text-xl font-semibold p-5">
        Loading...
      </div>
    );
  }
};
