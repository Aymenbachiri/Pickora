import { H1 } from "@/src/components/common/H1";
import { MyView } from "@/src/components/common/MyView";
import { Link } from "expo-router";

export default function home() {
  return (
    <MyView>
      <H1>home</H1>
      <Link href="/">go to home</Link>
    </MyView>
  );
}
