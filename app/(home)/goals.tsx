import { Stack } from "expo-router";
import { useState } from "react";
import { Progress } from "tamagui";

import { Container } from "~/components/Container";
import MultiStepForm from "~/components/MultiStepForm";

export default function Goals() {
  const [progress, setProgress] = useState(0);
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
        <Progress size="$2" value={progress} backgroundColor="$color.gray5">
          <Progress.Indicator
            animation="lazy"
            backgroundColor="$color.primary"
          />
        </Progress>
        <MultiStepForm setProgress={setProgress} />
      </Container>
    </>
  );
}
