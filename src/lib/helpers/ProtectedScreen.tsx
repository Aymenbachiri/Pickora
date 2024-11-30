import { useAuth } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";

export function ProtectedScreen({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signin" />;
  }

  return <>{children}</>;
}
