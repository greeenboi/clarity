import { Stack } from "expo-router";

export default function FunctionsLayout() {
  return (
    <Stack initialRouteName="music-player">
      <Stack.Screen
        name="music-player"
        options={{ presentation: "transparentModal" }}
      />
    </Stack>
  );
}
