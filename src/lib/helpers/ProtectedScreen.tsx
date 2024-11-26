import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export function ProtectedScreen({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (!isSignedIn) {
    router.replace("/signin");
  }

  return <>{children}</>;
}
