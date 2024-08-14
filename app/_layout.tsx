import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  useGlobalSearchParams,
  usePathname,
} from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";

import config from "../tamagui.config";

import { AuthProvider } from "~/providers/AuthContext";

export default function RootLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    console.log(pathname, params);
  }, [pathname, params]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <Stack initialRouteName="details">
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="(functions)" options={{ headerShown: false }} />
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
