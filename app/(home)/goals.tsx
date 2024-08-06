import { Stack } from "expo-router";

import { Container } from "~/components/Container";
import MultiStepForm from "~/components/MultiStepForm";

export default function Goals() {
  return (
    <>
      <Stack.Screen
        options={{
          title: `My Goals`,
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
        <MultiStepForm />
      </Container>
    </>
  );
}
