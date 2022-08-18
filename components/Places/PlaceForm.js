import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../components/models/place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectImage, setSelectImage] = useState();

  // get image uri from ImagePicker component
  const takeImageHandler = (imageUri) => {
    setSelectImage(imageUri);
  };
  // get location from LocationPicker component
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  // save all collected data of a place
  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectImage, pickedLocation);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={setEnteredTitle}
          placeholder="Enter Title"
        />
      </View>
      <ImagePicker onImageTaken={takeImageHandler} />
      <LocationPicker onLocationPick={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
