import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places found</Text>
      </View>
    );
  }
  const selectPlaceHandler = (id) => {
    navigation.navigate("PlaceDetail", {
      placeId: id,
    });
  };
  const renderItem = ({ item }) => {
    return <PlaceItem place={item} onSelect={selectPlaceHandler} />;
  };

  return (
    <FlatList
      style={styles.listStyle}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  listStyle: {
    margin: 24,
  },

  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary200,
  },
});
