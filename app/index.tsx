import { router } from "expo-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import PromoList from "~/components/PromoList";

export default function Home() {
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
