import { MyView } from "../components/common/MyView";
import { MyText } from "../components/common/MyText";
import { H1 } from "../components/common/H1";
import { H2 } from "../components/common/H2";
import { StatusBar, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Index() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar backgroundColor={colorScheme === "dark" ? "#000" : "#fff"} />
      <MyView className="justify-center items-center dark:bg-black">
        <MyText className="text-green-600">
          Edit app/index.tsx to edit this screen.ss
        </MyText>
        <H1>hello</H1>
        <H2>world</H2>
        <TouchableOpacity onPress={toggleColorScheme}>
          <Feather
            name={colorScheme === "dark" ? "sun" : "moon"}
            color={colorScheme === "dark" ? "#fff" : "#000"}
            size={24}
          />
        </TouchableOpacity>
        <Link href="/(tabs)/home">go to tabs</Link>
      </MyView>
    </>
  );
}
