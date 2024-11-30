import { MyView } from "../components/common/MyView";
import { H1 } from "../components/common/H1";
import { H2 } from "../components/common/H2";
import { Button, StatusBar, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useTheme } from "../lib/providers/ThemeProvider";

export default function Profile() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <MyView className="flex-1 p-4 dark:bg-black">
        <MyView className="flex justify-between items-center flex-row gap-4">
          <H1>Profile</H1>

          <TouchableOpacity onPress={toggleColorScheme}>
            <Feather
              name={colorScheme === "dark" ? "sun" : "moon"}
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </MyView>

        <H2>{user?.emailAddresses[0].emailAddress}</H2>

        <MyView className="mt-4 flex flex-col gap-4">
          {isSignedIn && (
            <>
              <Link href="/sell-product">
                <H2>Sell product</H2>
              </Link>
              <Link href="/my-products">
                <H2>My products</H2>
              </Link>
            </>
          )}
          <Link href="/cart">
            <H2>Cart</H2>
          </Link>
        </MyView>

        <MyView className="flex-1 flex gap-4 justify-center items-center p-4 dark:bg-black dark:text-white">
          {!isSignedIn && (
            <>
              <Link
                href={"/(auth)/signin"}
                className="flex flex-row gap-6 bg-green-600 p-4 rounded-md justify-center items-center"
              >
                <H2>Sign In </H2>{" "}
                <MaterialCommunityIcons
                  name="login"
                  size={24}
                  color={colorScheme === "dark" ? "#fff" : "#000"}
                />
              </Link>
              <Link
                href={"/(auth)/signup"}
                className="flex flex-row gap-6 bg-green-600 p-4 rounded-md justify-center items-center"
              >
                <H2 className="pr-3">Sign Up </H2>{" "}
                <Feather
                  name="user-plus"
                  size={24}
                  color={colorScheme === "dark" ? "#fff" : "#000"}
                />
              </Link>
            </>
          )}
          {isSignedIn && (
            <MyView>
              <Button title="Sign Out" onPress={() => signOut()} />
            </MyView>
          )}
        </MyView>
      </MyView>
    </>
  );
}
