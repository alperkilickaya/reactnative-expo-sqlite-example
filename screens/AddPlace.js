import React from "react";
import { View, Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
