import React, { useEffect, useState } from "react";

import "../../App.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon, DivIcon, point, Icon } from "leaflet";
import { geocode } from "opencage-api-client";
import axios from "axios";

const customIcon = new Icon({
  iconUrl:
    "https://as2.ftcdn.net/v2/jpg/05/72/20/81/1000_F_572208185_2NVmGnwrBykudKF8ytKyIxfoQak60DsN.jpg",
  iconSize: [38, 38],
});
const createClusterCustomIcon = function (cluster: any): DivIcon {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

interface MarkerData {
  geocode: [number, number];
  popUp: string;
}
const citiesByContinent: { continent: string; cities: MarkerData[] }[] = [
  {
    continent: "Europe",
    cities: [
      { geocode: [48.86, 2.3522], popUp: "Paris - Hello, I am pop up 1" },
      { geocode: [52.52, 13.405], popUp: "Berlin - Hello, I am pop up 2" },
      { geocode: [41.9028, 12.4964], popUp: "Rome - Hello, I am pop up 3" },
      { geocode: [51.5074, -0.1278], popUp: "London - Hello, I am pop up 4" },
      { geocode: [48.2082, 16.3738], popUp: "Vienna - Hello, I am pop up 5" },
      
    ],
  },
  {
    continent: "Africa",
    cities: [
      { geocode: [6.5244, 3.3792], popUp: "Lagos - Hello, I am pop up 6" },
      {
        geocode: [-33.9249, 18.4241],
        popUp: "Cape Town - Hello, I am pop up 7",
      },
      { geocode: [25.2048, 55.2708], popUp: "Dubai - Hello, I am pop up 8" },
      { geocode: [-1.2921, 36.8219], popUp: "Nairobi - Hello, I am pop up 9" },
      {
        geocode: [-33.918861, 18.4233],
        popUp: "Casablanca - Hello, I am pop up 10",
      },
      // Add more cities...
    ],
  },
  {
    continent: "Asia",
    cities: [
      { geocode: [35.6895, 139.6917], popUp: "Tokyo - Hello, I am pop up 11" },
      {
        geocode: [37.7749, -122.4194],
        popUp: "San Francisco - Hello, I am pop up 12",
      },
      { geocode: [19.076, 72.8777], popUp: "Mumbai - Hello, I am pop up 13" },
      {
        geocode: [13.7563, 100.5018],
        popUp: "Bangkok - Hello, I am pop up 14",
      },
      {
        geocode: [31.2304, 121.4737],
        popUp: "Shanghai - Hello, I am pop up 15",
      },
      // Add more cities...
    ],
  },
  {
    continent: "America",
    cities: [
      
     
    
    ],
  },
 
];

async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ city: string; lat: number; lng: number; continent: string }> {
  try {
    const response = await geocode({
      q: `${lat},${lng}`,
      key: "9b30c2b34a7e42d5a47e37cf98d7ad58",
    });
    console.log("fetching", response.results);

    if (response.status.code === 200 && response.results.length > 0) {
      const city =
        response.results[0].components.city ??
        response.results[0].components.state;
      return {
        city,
        ...response.results[0].geometry,
        continent: response.results[0].components.continent,
      };
    } else {
      throw new Error("Reverse geocoding failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function GlobalMap() {
  const [data, setData] = useState(citiesByContinent);
  console.log(process.env.REACT_APP_API_KEY_OPENWEATHER);
  
  const handleMapClick = async (event: any) => {
    const { lat, lng } = event.latlng;
    try {
      const {
        city,
        continent,
        lat: lat2,
        lng: lng2,
      } = await reverseGeocode(lat, lng);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lng2}&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}&units=metric`
      );
      const data = await res.data;
      setData((prev) => {
        const newData = prev.map((cont) => {
          let weatherData: null | { temp: number; main: string } = null;
          if (res.status === 200) {
            weatherData = { main: data.weather[0].main, temp: data.main.temp };
            console.log(weatherData);
          }
          if (cont.continent === continent) {
            cont.cities.push({
              geocode: [lat, lng],
              popUp: `City: ${city}, temp: ${weatherData?.temp} degress, weather: ${weatherData?.main}`,
            });
            return cont;
          } else {
            return cont;
          }
        });
        return newData;
      });
      console.log(`Latitude: ${lat}, Longitude: ${lng}, City: ${city}`);
    } catch (error) {
      console.error(error);
    }
  };

  function MapClickHandler() {
    const map = useMapEvents({
      click: handleMapClick,
    });

    useEffect(() => {
      map.options.maxZoom = 18;
    }, [map]);

    return null;
  }

  return (
    <div className="relative">
      
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {data.map((continentData, continentIndex) =>
          continentData.cities.map((city, cityIndex) => (
            <Marker
              key={`${continentIndex}-${cityIndex}`}
              position={city.geocode}
              icon={customIcon}
            >
              <Popup>{city.popUp}</Popup>
            </Marker>
          ))
        )}
      </MarkerClusterGroup>
     
    </MapContainer>
   
    </div>
  );
}
