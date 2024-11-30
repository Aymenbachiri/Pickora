import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { SignUpFormValues, signUpSchema } from "../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignInUser() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const formatErrorMessage = (error: any): string => {
    if (error?.errors) {
      return error.errors
        .map(
          (err: { message?: string }) =>
            err.message || "An unknown error occurred."
        )
        .join("\n");
    }
    if (error?.message) {
      return error.message;
    }
    return "An unexpected error occurred. Please try again later.";
  };

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Alert.alert("Sign-in Successful", "Welcome back!");
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert(
          "Sign-in Incomplete",
          "Your sign-in is not complete. Please try again."
        );
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Sign-in Failed", formatErrorMessage(err));
    }
  }, [isLoaded, emailAddress, password]);

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

      await onSignInPress();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "Signup failed",
      });
    }
  };

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
}
