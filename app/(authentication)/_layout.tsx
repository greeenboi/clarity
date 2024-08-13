import { Stack } from "expo-router";

export default function AuthenticationLayout() {
  return (
    <Stack initialRouteName="sign-in">
      <Stack.Screen name="sign-in" options={{ presentation: "card" }} />
      <Stack.Screen name="google-auth" options={{ presentation: "modal" }} />
      <Stack.Screen name="password-auth" options={{ presentation: "modal" }} />
      <Stack.Screen name="goals" options={{ presentation: "modal" }} />
    </Stack>
  );
}
