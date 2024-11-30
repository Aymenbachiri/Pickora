import { Tabs } from "expo-router";
import "../../global.css";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Providers } from "../lib/providers/Providers";

export default function RootLayout() {
  return (
    <Providers>
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
        <Tabs.Screen
          name="(auth)"
          options={{
            href: null,
            title: "",
          }}
        />
        <Tabs.Screen
          name="sell-product"
          options={{
            href: null,
            title: "sell-product",
          }}
        />
        <Tabs.Screen
          name="my-products"
          options={{
            href: null,
            title: "my-products",
          }}
        />
        <Tabs.Screen
          name="edit-product/[id]"
          options={{
            href: null,
            title: "Edit product",
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            href: null,
            title: "Cart",
          }}
        />
      </Tabs>
    </Providers>
  );
}
