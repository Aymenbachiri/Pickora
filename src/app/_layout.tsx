import { Tabs } from "expo-router";
import "../../global.css";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="products"
          options={{
            headerShown: false,
            title: "products",
            tabBarIcon: ({ color }) => (
              <Feather name="box" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-cog" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
