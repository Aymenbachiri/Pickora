import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar backgroundColor={colorScheme === "dark" ? "#000" : "#fff"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Index",
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity onPress={toggleColorScheme}>
                  <Feather
                    name={colorScheme === "dark" ? "sun" : "moon"}
                    size={24}
                    color={"#000"}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>
    </>
  );
}
