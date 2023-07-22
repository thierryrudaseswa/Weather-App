import React, { useEffect } from "react";
import "../../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon, DivIcon, point, Icon } from "leaflet";
import { geocode } from "opencage-api-client";

const customIcon = new Icon({
  iconUrl: "https://as2.ftcdn.net/v2/jpg/05/72/20/81/1000_F_572208185_2NVmGnwrBykudKF8ytKyIxfoQak60DsN.jpg",
  iconSize: [38, 38]
});

const createClusterCustomIcon = function (cluster: any): DivIcon {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
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
      { geocode: [52.5200, 13.4050], popUp: "Berlin - Hello, I am pop up 2" },
      { geocode: [41.9028, 12.4964], popUp: "Rome - Hello, I am pop up 3" },
      { geocode: [51.5074, -0.1278], popUp: "London - Hello, I am pop up 4" },
      { geocode: [48.2082, 16.3738], popUp: "Vienna - Hello, I am pop up 5" },
      // Add more cities...
    ],
  },
  {
    continent: "Africa",
    cities: [
      { geocode: [6.5244, 3.3792], popUp: "Lagos - Hello, I am pop up 6" },
      { geocode: [-33.9249, 18.4241], popUp: "Cape Town - Hello, I am pop up 7" },
      { geocode: [25.2048, 55.2708], popUp: "Dubai - Hello, I am pop up 8" },
      { geocode: [-1.2921, 36.8219], popUp: "Nairobi - Hello, I am pop up 9" },
      { geocode: [-33.918861, 18.423300], popUp: "Casablanca - Hello, I am pop up 10" },
      // Add more cities...
    ],
  },
  {
    continent: "Asia",
    cities: [
      { geocode: [35.6895, 139.6917], popUp: "Tokyo - Hello, I am pop up 11" },
      { geocode: [37.7749, -122.4194], popUp: "San Francisco - Hello, I am pop up 12" },
      { geocode: [19.0760, 72.8777], popUp: "Mumbai - Hello, I am pop up 13" },
      { geocode: [13.7563, 100.5018], popUp: "Bangkok - Hello, I am pop up 14" },
      { geocode: [31.2304, 121.4737], popUp: "Shanghai - Hello, I am pop up 15" },
      // Add more cities...
    ],
  },
  {
    continent: "America",
    cities: [
      { geocode: [40.7128, -74.0060], popUp: "New York City - Hello, I am pop up 16" },
      { geocode: [34.0522, -118.2437], popUp: "Los Angeles - Hello, I am pop up 17" },
      { geocode: [19.4326, -99.1332], popUp: "Mexico City - Hello, I am pop up 18" },
      { geocode: [43.6532, -79.3832], popUp: "Toronto - Hello, I am pop up 19" },
      { geocode: [-34.6037, -58.3816], popUp: "Buenos Aires - Hello, I am pop up 20" },
      // Add more cities...
    ],
  },
  // Add more continents and cities...
];


async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const response = await geocode({ q: `${lat},${lng}`, key: "9b30c2b34a7e42d5a47e37cf98d7ad58" });
    if (response.status.code === 200 && response.results.length > 0) {
      const city = response.results[0].components.city;
      return city;
    } else {
      throw new Error("Reverse geocoding failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function GlobalMap() {
  const handleMapClick = async (event: any) => {
    const { lat, lng } = event.latlng;
    try {
      const city = await reverseGeocode(lat, lng);
      console.log(`Latitude: ${lat}, Longitude: ${lng}, City: ${city}`);
    } catch (error) {
      console.error(error);
    }
  };

  function MapClickHandler() {
    const map = useMapEvents({
      click: handleMapClick
    });

    useEffect(() => {
      map.options.maxZoom = 18;
    }, [map]);

    return null;
  }

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {citiesByContinent.map((continentData, continentIndex) => (
          continentData.cities.map((city, cityIndex) => (
            <Marker key={`${continentIndex}-${cityIndex}`} position={city.geocode} icon={customIcon}>
              <Popup>{city.popUp}</Popup>
            </Marker>
          ))
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
