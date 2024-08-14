import { Stack } from "expo-router";
import { H1 } from "tamagui";

import { Container } from "~/components/Container";

export default function MusicPLayer() {
  return (
    <>
      <Stack.Screen
        options={{
          title: ``,
          headerShown: true,
          headerStyle: { backgroundColor: "#121826" },
          headerTintColor: "#fff",
        }}
      />
      <Container
        backgroundColor="$color.gray9"
        flexDirection="column"
        justifyContent="center"
      >
        <H1>Music Player</H1>
      </Container>
    </>
  );
}
