// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useQuery } from "@tanstack/react-query";
// import { useStore } from "../../store";

// interface City {
//   name: string;
//   latitude: number;
//   longitude: number;
//   temperature: number;
// }

// const HotCitiesMap: React.FC = () => {
//   const [hoveredCity, setHoveredCity] = useState<City | null>(null);

//   const handleMarkerHover = (city: City) => {
//     setHoveredCity(city);
//   };

//   const handleMarkerLeave = () => {
//     setHoveredCity(null);
//   };

//   const fetchHotCitiesByContinent = async (continent: string): Promise<City[]> => {
//     const { location_key } = useStore();
//     const response = await fetch(
//       `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${process.env.REACT_APP_API_KEY}&details=true`
//     );
//     const data = await response.json();
//     return data;
//   };

//   const { data: asiaCities, isLoading: isLoadingAsia } = useQuery<City[], Error>(
//     ["asiaCities"],
//     () => fetchHotCitiesByContinent("Asia")
//   );

//   const { data: europeCities, isLoading: isLoadingEurope } = useQuery<City[], Error>(
//     ["europeCities"],
//     () => fetchHotCitiesByContinent("Europe")
//   );

//   // Repeat the above useQuery block for each continent

//   const continents: { name: string; cities: City[] }[] = [
//     { name: "Asia", cities: asiaCities || [] },
//     { name: "Europe", cities: europeCities || [] },
//     // Add more continents as needed
//   ];

//   const isLoading = isLoadingAsia || isLoadingEurope;

//   return (
//     <MapContainer
//     whenReady={(map) => {
//         if (map && map.setView) {
//           map.setView([0, 0], 2);
//         }
//       }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {continents.map((continent) =>
//         continent.cities.map((city) => (
//           <Marker
//             key={city.name}
//             position={[city.latitude, city.longitude]}
//             eventHandlers={{
//               mouseover: () => handleMarkerHover(city),
//               mouseout: handleMarkerLeave,
//             }}
//           >
//             {hoveredCity === city && (
//               <Popup>{`${city.name} - Temperature: ${city.temperature}`}</Popup>
//             )}
//           </Marker>
//         ))
//       )}
//     </MapContainer>
//   );
// };

// export default HotCitiesMap;

import React from 'react'

function GoogleMap() {
  return (
    <div></div>
  )
}

export default GoogleMap