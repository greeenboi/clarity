import { Stack } from 'expo-router';
import { H2 } from 'tamagui';

import { Container } from '~/components/Container';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: 'home', headerShown: false }} />
      <Container>
        <H2>Wassup</H2>
      </Container>
    </>
  );
}
