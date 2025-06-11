import { useAuth as useClerkAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useAuth() {
  const { isLoaded, isSignedIn } = useClerkAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthGroup) {
      // Redirect to sign-in if not signed in and trying to access protected routes
      router.replace("/(auth)/sign-in");
    } else if (isSignedIn && inAuthGroup) {
      // Redirect to home if signed in and trying to access auth routes
      router.replace("/(protected)/(tabs)/Listing");
    }
  }, [isSignedIn, segments, isLoaded]);

  return {
    isLoaded,
    isSignedIn,
  };
}
