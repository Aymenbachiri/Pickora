import { Tabs } from "expo-router";
import "../../global.css";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export default function RootLayout() {
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
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
        <Tabs.Screen
          name="products/[id]"
          options={{
            href: null,
            title: "",
          }}
        />
      </Tabs>
    </ClerkProvider>
  );
}
