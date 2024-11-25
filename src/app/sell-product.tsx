import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";
import { TextInput } from "react-native";

export default function SellProduct() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (!isSignedIn) {
    router.replace("/signin");
  }

  return (
    <MyView className="flex-1 bg-white p-4 dark:bg-black">
      <MyText>SellProduct</MyText>

      <MyView className="flex flex-col gap-4 justify-center items-center">
        <TextInput
          className="border rounded-md"
          autoCapitalize="none"
          placeholder="Title"
        />
        <TextInput
          className="border rounded-md"
          autoCapitalize="none"
          placeholder="Description"
        />
        <TextInput
          className="border rounded-md"
          autoCapitalize="none"
          placeholder="Price"
        />
        <TextInput
          className="border rounded-md"
          autoCapitalize="none"
          placeholder="Category"
        />
        <TextInput
          className="border rounded-md"
          autoCapitalize="none"
          placeholder="Image Url"
        />
      </MyView>
    </MyView>
  );
}
