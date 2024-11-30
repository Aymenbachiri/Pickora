import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { SignUpFormValues, signUpSchema } from "../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignUpUser() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const formatError = (error: any) => {
    if (error?.errors) {
      return error.errors
        .map((err: any) => err.message || "An unknown error occurred.")
        .join("\n");
    }
    return error?.message || "An unexpected error occurred. Please try again.";
  };

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
      Alert.alert("Signup Successful");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Signup Failed", formatError(err));
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
        Alert.alert("Verification Successful", "You are now signed up.");
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert(
          "Verification Incomplete",
          "Please check the verification code and try again."
        );
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Verification Failed", formatError(err));
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setEmailAddress(data.emailAddress);
      setPassword(data.password);

      await onSignUpPress();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "Signup failed",
      });
    }
  };

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    pendingVerification,
    code,
    setCode,
    onSignUpPress,
    onPressVerify,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
}
