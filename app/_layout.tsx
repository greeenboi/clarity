import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";

import config from "../tamagui.config";

import { AuthProvider } from "~/providers/AuthContext";

export const unstable_settings = {
  initialRouteName: "/j",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <Stack initialRouteName="details">
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(authentication)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </TamaguiProvider>
  );
}
