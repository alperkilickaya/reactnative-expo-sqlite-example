import React, { useLayoutEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  // if there is no initialLocation comes from PlaceDetail selectedLocation state will be undefined
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  // if there is initialLocation object it means we come from PlaceDetail else use default lat and lng
  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78825,
    longitude: initialLocation ? initialLocation.lng : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    // prevent reselection of marker if you come from PlaceDetail
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat,
      lng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("Warning!", "Please select a location");
      return;
    }
    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);
  console.log("selectedLocation", selectedLocation);
  console.log("initialLocation", initialLocation);
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
