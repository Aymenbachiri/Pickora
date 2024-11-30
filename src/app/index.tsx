import { Image, ScrollView, StatusBar, View } from "react-native";
import { H1 } from "../components/common/H1";
import { H2 } from "../components/common/H2";
import { MyText } from "../components/common/MyText";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../lib/providers/ThemeProvider";

export default function Home() {
  const { colorScheme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />

      <ScrollView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-black">
        <H2 className="text-center mt-3">Welome to Pickora</H2>
        <H1 className="text-center mt-10">Where Style Meets Savings</H1>
        <MyText className="text-center mt-10">
          Uncover the latest trends and unbeatable deals, all curated just for
          you. At Pickora, we make shopping effortless and exciting, ensuring
          you find everything you need in one perfect place.
        </MyText>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          height={300}
          width={400}
          className="mt-10 mx-auto rounded-md"
        />

        <View className="flex mx-auto  flex-col justify-center items-center mt-10">
          <Feather
            style={{
              textAlign: "center",
              backgroundColor: "#10B981",
              padding: 4,
              borderRadius: 15,
            }}
            name="box"
            size={28}
            color="white"
          />
          <H2 className="text-center">Seamless Product Browsing</H2>
          <MyText className="text-center">
            Effortlessly find your favorites with Pickora’s easy-to-use
            interface.
          </MyText>
        </View>

        <View className="flex mx-auto  flex-col justify-center items-center mt-10">
          <MaterialIcons
            name="security"
            style={{
              textAlign: "center",
              backgroundColor: "#10B981",
              padding: 4,
              borderRadius: 15,
            }}
            size={28}
            color="white"
          />
          <H2 className="text-center">Secure Checkout</H2>
          <MyText className="text-center">
            Shop confidently with fast, secure payments and multiple options.
          </MyText>
        </View>

        <View className="flex mx-auto pb-4  flex-col justify-center items-center mt-10">
          <AntDesign
            name="customerservice"
            style={{
              textAlign: "center",
              backgroundColor: "#10B981",
              padding: 4,
              borderRadius: 15,
            }}
            size={28}
            color="white"
          />
          <H2 className="text-center">24/7 Support</H2>
          <MyText className="text-center">
            Get round-the-clock assistance whenever you need it.
          </MyText>
        </View>
      </ScrollView>
    </>
  );
}
