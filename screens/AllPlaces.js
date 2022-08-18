import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchDbPlaces } from "../util/database";
const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    // load places from local device db
    const loadDbPlacesAsync = async () => {
      const places = await fetchDbPlaces();
      setLoadedPlaces(places);
    };

    if (isFocused) {
      loadDbPlacesAsync();
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
