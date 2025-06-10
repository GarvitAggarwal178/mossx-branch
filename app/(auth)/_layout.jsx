import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function AuthLayout() {
  const { isSignedIn } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(protected)/(tabs)/Listing");
    }
  }, [isSignedIn]);

  return <Slot />;
}
