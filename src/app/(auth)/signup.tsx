import { MyView } from "@/src/components/common/MyView";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, ActivityIndicator } from "react-native";
import { toast, Toaster } from "sonner-native";
import "react-native-gesture-handler";
import { H2 } from "@/src/components/common/H2";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
      toast.success("user signed up successfully");
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      toast.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("code has been verified successfully");
        router.replace("/profile");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        toast.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      toast.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <MyView className="flex-1 dark:bg-black">
        {!pendingVerification && (
          <MyView className="flex flex-1 w-full gap-4 justify-center items-center">
            <MyView className="flex w-full flex-col gap-2">
              <H2 className="text-start">Email</H2>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="aymen.bachiri99@gmail.com"
                onChangeText={(email) => setEmailAddress(email)}
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
            <Button title="Sign Up" onPress={onSignUpPress} />
          </MyView>
        )}
        {pendingVerification && (
          <MyView className="flex flex-1 w-full gap-4 justify-center items-center">
            <H2 className="text-start">Enter the code sent to your email</H2>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
              className="dark:bg-white border p-4 w-full"
            />
            <Button title="Verify Email" onPress={onPressVerify} />
          </MyView>
        )}
      </MyView>
    </>
  );
}
