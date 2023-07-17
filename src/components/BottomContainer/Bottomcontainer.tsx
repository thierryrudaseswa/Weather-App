import React from "react";
import GoogleMap from "./MapGoogle";
import { useQuery } from "@tanstack/react-query";
import CityComp from "./CityComp";
import GlobalMap from "../googleMap/GlobalMap1";

export const BottomContainer: React.FC = () => {
  return (
    <div className="mainbottom flex flex-row w-full  m-3 gap-6  ">
      <div className="leftbottom basis-2/3  text-white ">
        <div className="topbottom flex justify-between h-12  items-center">
          <div className="globalmap font-extrabold cursor-pointer ">
            Global map
          </div>
          <div className="wide font-semibold  w-32 flex justify-center rounded-full bg-neutral-900 h-9 items-center cursor-pointer">
            View Wide 🎇
          </div>
        </div>
        <div className="googlemap h-full">
          <GlobalMap />
        </div>
      </div>
      <div className="rightbottom basis-1/3  h-72 mx-2 ">
        <div className="toprightbottom flex justify-between items-center">
          <div className="rightrightbottom flex m-2 font-bold items-center w-56 h-12 text-white  cursor-pointer ">
            other large cities
          </div>
          <div className="show  m-2 font-semibold h-12 flex items-center p-2 text-white cursor-pointer ">
            {" "}
            show All
          </div>
        </div>
        <CityComp loc_key="2121532" city="Califonia" country="US" />
        <CityComp loc_key="101924" city="Beijing" country="China" />
        <CityComp loc_key="213225" city="Jerusalem" country="Israel" />
      </div>
    </div>
  );
};
