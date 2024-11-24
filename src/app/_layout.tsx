import { Stack, Tabs } from "expo-router";
import "../../global.css";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
