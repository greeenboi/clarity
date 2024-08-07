import { Redirect, router } from "expo-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import PromoList from "~/components/PromoList";
import { useAuthContext } from "~/providers/AuthContext";

export default function Home() {
  const { session } = useAuthContext();
  if (session && session.user) {
    return <Redirect href="/details" />;
  }
  return (
    <Container
      backgroundColor="$color.gray9"
      flexDirection="column"
      justifyContent="space-between"
    >
      <PromoList />
      <Button
        onPress={() => router.push("/sign-in")}
        color="$white"
        title="Let's Begin"
      />
    </Container>
  );
}
