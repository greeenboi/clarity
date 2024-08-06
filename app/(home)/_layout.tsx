import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack initialRouteName="details" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="details" />
      <Stack.Screen name="goals" options={{ presentation: "modal" }} />
    </Stack>
  );
}
