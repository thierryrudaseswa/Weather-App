import { create } from "zustand";
import { client } from ".";

interface Store {
  location_key: string;
  setLocation: (location_key: string) => void;
}

export const useStore = create<Store>((set) => ({
  location_key: "293211",
  setLocation: (location) => {
    console.log(location);
    
    client.refetchQueries({
      queryKey: ["data"],
    });
    client.refetchQueries({
      queryKey: ["data_current"],
    });
    set({
      location_key: location,
    });
  },
}));
