import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput } from "react-native";
import { toast, Toaster } from "sonner-native";
import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.create({
        emailAddress,
        password,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <MyView className="flex-1">
      <Toaster position="bottom-center" />
      <Button
        onPress={() => toast.error("Operation successful!")}
        title="Show test toast"
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign Up" onPress={onSignUpPress} />
    </MyView>
  );
}
