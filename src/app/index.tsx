import { Text, View } from "react-native";
import { MyView } from "../components/common/MyView";
import { MyText } from "../components/common/MyText";
import { H1 } from "../components/common/H1";
import { H2 } from "../components/common/H2";

export default function Index() {
  return (
    <MyView className="justify-center items-center">
      <MyText className="text-green-600">
        Edit app/index.tsx to edit this screen.ss
      </MyText>
      <H1>hello</H1>
      <H2>world</H2>
    </MyView>
  );
}
