import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { Container } from "~/components/Container";
import SignInForm from "~/components/auth/sign-in-form";
import SignUpForm from "~/components/auth/sign-up-form";
import pwdScheme from "~/types/forms";

export default function SignIn() {
  const { schemestate } = useLocalSearchParams<{ schemestate?: string }>();
  const [scheme, setScheme] = useState<pwdScheme>("Sign in");
  useEffect(() => {
    if (schemestate) {
      setScheme(schemestate as pwdScheme);
    }
  }, [schemestate]);
  return (
    <>
      <Stack.Screen
        options={{
          title: scheme,
          headerStyle: { backgroundColor: "#121826" },
          headerTintColor: "#fff",
        }}
      />
      <Container
        backgroundColor="$color.gray9"
        flexDirection="column"
        justifyContent="space-between"
      >
        {scheme === "Sign in" ? <SignInForm /> : <SignUpForm />}
      </Container>
    </>
  );
}
