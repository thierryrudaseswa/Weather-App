const GoogleMap: React.FC = () => {
  return <div className="map h-full w-full bg-red-700">
    {process.env.API_KEY}
  </div>;
};

export default GoogleMap;
