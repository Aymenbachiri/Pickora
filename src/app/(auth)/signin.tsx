import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Button, TextInput } from "react-native";
import { toast, Toaster } from "sonner-native";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim().toLowerCase(), // Normalize the email
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        toast.success("Sign-in successful!");
        router.replace("/");
      } else {
        console.log("Sign in status:", signInAttempt.status);
        // Handle incomplete status
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast.error(err.errors?.[0]?.message || "Sign in failed");
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <MyView className="flex-1">
      <Toaster position="bottom-center" />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign In" onPress={onSignInPress} />
      <MyView>
        <MyText>Don't have an account?</MyText>
        <Link href={"/(auth)/signup"}>
          <MyText>Sign up</MyText>
        </Link>
      </MyView>
    </MyView>
  );
}
