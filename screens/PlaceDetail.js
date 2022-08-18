import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "../components/UI/OutlinedButton";
import { fetchPlaceById } from "../util/database";

const PlaceDetail = ({ route, navigation }) => {
  const [dbSelectedPlace, setDbSelectedPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: dbSelectedPlace.location.lat,
      initialLng: dbSelectedPlace.location.lng,
    });
  };

  //get id fron route
  const selectedPlaceId = route.params.placeId;

  // get place detail from db by id
  useEffect(() => {
    const selectPlaceFromDb = async () => {
      const placeFromDb = await fetchPlaceById(selectedPlaceId);
      setDbSelectedPlace(placeFromDb);
      //set screen title with place title
      navigation.setOptions({
        title: placeFromDb.title,
      });
    };
    selectPlaceFromDb();
  }, [selectedPlaceId]);

  // at first render dbSelectedPlace state is empty. To avoid error;
  if (!dbSelectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: dbSelectedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{dbSelectedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetail;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "30%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
