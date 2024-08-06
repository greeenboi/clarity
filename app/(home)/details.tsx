import { Link, Stack } from "expo-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import SignOutButton from "~/components/auth/sign-out";
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
        <SignOutButton />
        <Link href="/goals" asChild>
          <Button
            color="$white"
            backgroundColor="$color.gray7"
            title="go to goals"
            size="$5"
          />
        </Link>
      </Container>
    </>
  );
}
