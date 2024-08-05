import { Stack } from "expo-router";
import { ToastAndroid } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import PromoList from "~/components/PromoList";
// import GoogleSignIn from "~/components/auth/Auth.native";

export default function SignIn() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign In / Up with Google",
          headerStyle: { backgroundColor: "#121826" },
          headerTintColor: "#fff",
        }}
      />
      <Container
        backgroundColor="$color.gray9"
        flexDirection="column"
        justifyContent="space-between"
      >
        <PromoList />
        <Button
          onPress={() => ToastAndroid.show("Coming Soon", ToastAndroid.SHORT)}
          color="$white"
          title="Google Sign In"
        />

        {/* <GoogleSignIn /> */}
      </Container>
    </>
  );
}
