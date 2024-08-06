import { router } from "expo-router";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { Spinner } from "tamagui";

import { Logout } from "../icons";

import { useAuthContext } from "~/providers/AuthContext";
import { Button } from "~/tamagui.config";
import { supabase } from "~/utils/supabase";

export default function SignOutButton() {
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off",
  );
  const { session } = useAuthContext();
  const SignOut = async () => {
    console.log(session);
    console.log("signing out");
    setStatus("submitting");
    const { error } = await supabase.auth.signOut({
      scope: "local",
    });
    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log(error.message);
      setStatus("off");
    } else {
      ToastAndroid.show("Signed out", ToastAndroid.SHORT);
      console.log("signed out");
      router.replace("/sign-in");
      setStatus("submitted");
    }
  };
  return (
    <Button
      icon={status === "submitting" ? () => <Spinner /> : Logout}
      backgroundColor="$color.error"
      onPress={() => SignOut()}
    >
      Sign Out
    </Button>
  );
}
