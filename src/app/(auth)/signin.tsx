import { H2 } from "@/src/components/common/H2";
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
        router.replace("/profile");
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
    <MyView className="flex-1 dark:bg-black justify-center items-center gap-6">
      <Toaster position="bottom-center" />
      <MyView className="flex w-full flex-col gap-2">
        <H2 className="text-start">Email</H2>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="aymen.bachiri99@gmail.com"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          className="dark:bg-white border p-4 w-full"
        />
      </MyView>

      <MyView className="flex w-full flex-col gap-2">
        <H2 className="text-start">Password</H2>

        <TextInput
          value={password}
          placeholder="******"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className="dark:bg-white border p-4 w-full"
        />
      </MyView>
      <Button title="Sign In" onPress={onSignInPress} />
      <MyView className="flex justify-between items-center gap-4 flex-row">
        <MyText>Don't have an account?</MyText>
        <Link href={"/(auth)/signup"}>
          <MyText className="underline">Sign up</MyText>
        </Link>
      </MyView>
    </MyView>
  );
}
