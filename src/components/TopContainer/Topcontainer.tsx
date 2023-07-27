import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { useDebounce } from "@uidotdev/usehooks";
import ReactHTMLDatalist from "react-html-datalist";
import DarkMode from "../darkMode/DarkMode";
function TopContainer() {


  const { setLocation, location_key } = useStore();
  const [input, setInput] = useState("");
  const [loc, setloc] = useState("");
  const [CurrentCity, setCurrentCity] = useState("Kigali, Rwanda");
  const [datalist, setDatalist] = useState<any[]>([]);
  const debInput = useDebounce(input, 300);


  

  const fetchData = async () => {
    const res = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${debInput}`
    );
    const data = await res.json();
    if (data){
      setDatalist(
        data.map(
          (item: {
            LocalizedName: any;
            Country: { LocalizedName: any };
            Key: any;
          }) => ({
            text: `${item.LocalizedName}, ${item.Country.LocalizedName}`,
            value: item.Key,
          })
        )
      );
      console.log(datalist);
    }
  };
  useEffect(() => {
    fetchData();
  }, [debInput]);
  

   
  return (
    <div className="main  h-20">
      <div className="main2  flex justify-betweeen  p-2 gap-1 ">
        <div className="part1 flex flex-1   items-center  px-4 gap-4 p-2 ">
          <div className="icons flex gap-1 cursor-pointer sm:flex-wrap  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-10 bg-zinc-900 rounded-full p-2 h-10 m-1 md2:w-8 sm:5"
            >
              <path
                fill-rule="evenodd"
                d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-10 bg-zinc-900 rounded-full p-2 h-10 m-1 md2:w-8 sm:5 "
            >
              <path
                fill-rule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div className="location flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8  p-2 h-8 m-1 "
            >
              <path
                fill-rule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            <div className="city flex ">
              <span className="font-bold text-slate-300 md2:text-slate-200 sm:text-slate-100">{CurrentCity.split(", ")[0]},</span>{" "}
              <span className="font-lmedium text-slate-600">{CurrentCity.split(", ")[1]}</span>
            </div>
          </div>
        </div>

        <div className="part2 flex items-center  flex-1 p-2 ">
          <div className="search flex items-center bg-zinc-900 h-12 rounded-full w-full gap-4 md2:w-60 md2:gap-2 md2:p-1  ">
            <button
              onClick={() => {
                if (loc.length > 0) {
                  console.log("test");
                  setLocation(loc);
                  setCurrentCity(input);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="w-6 h-6 m-2 md2:w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* <input
              className="search rounded-full outline-none text-white bg-zinc-900 w-72"
              placeholder="Search city..."
              id="search"
              list="searches"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            /> */}
            <ReactHTMLDatalist
              name={"food_id"}
              onChange={(e: {
                target: {
                  name: React.SetStateAction<string>;
                  value: React.SetStateAction<string>;
                  text: React.SetStateAction<string>;
                };
              }) => {
                // console.log(e.target.text, " | ", e.target.value);

                // setInput(e.target.name);
                setInput(e.target.text);
                setloc(e.target.value);
                console.log(e.target.value);
                
              }}
              classNames={
                "search rounded-full outline-none text-white bg-zinc-900 w-72 md2:w-60"
              }
              options={datalist}
            />
            {/* <datalist id="searches">
              {datalist.map((item, i) => (
                <option
                  value={item.LocalizedName}
                  key={i}
                  // onClick={() => setLocation(item.Key)}
                />
              ))}
            </datalist> */}
          </div>
        </div>

        <div
          className="part3 relative flex flex-1  items-center p-2 gap-3 md3:flex-2  sm:gap-0 sm:p-0 sm:justify-center  sm:w-20 sm:flex-wrap sm:h-24 "
        >
       

          <div className="profile absolute flex items-center justify-center  p-3 right-0 m-3  sm:relative  sm:m-0 sm:p-0 
          ">
            <div className="image flex relative w-12 h-10 items-center justify-center">
              <img
                src="/image/thierry.PNG"
                alt="thierry"
                className="image rounded-full absolute inset-0 m-auto cursor-pointer"
              />
            </div>
           
          </div>
          <DarkMode/>
        </div>
      </div>
      
    </div>
  );
}

export default TopContainer;
