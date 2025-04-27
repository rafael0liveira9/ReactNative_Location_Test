import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  );
}
