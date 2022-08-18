import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { getAddresses, getMapPreview } from "../../util/location";

const LocationPicker = ({ onLocationPick }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const mapPickedLocation = route.params?.pickedLocation;
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // If we chose a location from the map, then it will work when we come here.
  useEffect(() => {
    if (isFocused && route.params) {
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  // when new location saved to pickedLocation state either by selecting from map or getting current device location send it to PlaceForm component
  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddresses(
          pickedLocation.lat,
          pickedLocation.long
        );
        onLocationPick({ ...pickedLocation, address: address });
      }
    };
    handleLocation();
  }, [pickedLocation, onLocationPick]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficent Permissions",
        "You need to enable location permissions to use this app"
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location taken yet.</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.long),
        }}
        style={styles.image}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};
export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
