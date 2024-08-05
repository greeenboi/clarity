import { Stack } from "expo-router";

import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { useAuthContext } from "~/providers/AuthContext";

export default function Details() {

  const { session } = useAuthContext();

  const user = session?.user;

  return (
    <>
      <Stack.Screen options={{ title: "Details" }} />
      <Container
        backgroundColor="$color.gray9"
        flexDirection="column"
        justifyContent="space-between"
      >
        <ScreenContent
          path="screens/details.tsx"
          title={`Showing details for user ${user?.email} `}
        />
      </Container>
    </>
  );
}
