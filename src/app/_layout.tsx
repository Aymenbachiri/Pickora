import { Tabs } from "expo-router";
import "../../global.css";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
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

  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <ClerkLoaded>
          <Toaster />
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
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
