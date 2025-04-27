import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import clientsData from "@/assets/json/locations.json";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ClientTypes {
  name?: string;
  description?: string;
  type?: number;
  curitibanices: number;
  category?: string;
  district?: string;
  latitude: number;
  longitude: number;
}

export default function HomeScreen() {
  const [myLocation, setMyLocation] = useState<any>(),
    [clients, setClients] = useState<ClientTypes[]>();

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permissão negada");
      return;
    }

    setMyLocation(await Location.getCurrentPositionAsync({}));
  };

  const getClients = () => {
    setClients(clientsData);
  };

  useEffect(() => {
    getLocation();
    getClients();
  }, []);

  if (!myLocation) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Carregando localização...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: myLocation.coords.latitude,
          longitude: myLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: myLocation.coords.latitude,
            longitude: myLocation.coords.longitude,
          }}
          title={"Você está aqui"}
        />
        {clients &&
          clients.length > 0 &&
          clients.map((e, y) => {
            // console.log(e);
            return (
              <Marker
                key={y}
                coordinate={{
                  latitude: e?.latitude / 1e14,
                  longitude: e?.longitude / 1e14,
                }}
                title={e.name}
              >
                <AntDesign name="slack-square" size={24} color="#0016BCFF" />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  borderTest: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
});
