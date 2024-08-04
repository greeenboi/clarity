import { Link, router, Stack } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import PromoList from '~/components/PromoList';

export default function SignIn() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sign In / up' }} />
      <Container
        backgroundColor="$color.gray9"
        flexDirection="column"
        justifyContent="space-between">
        {/* <PromoList /> */}
        {/* <Link href={{ pathname: '/details' }} asChild> */}
        <Button onPress={() => router.replace('/details')} color="$white" title="Sign In" />
        {/* </Link> */}
      </Container>
    </>
  );
}
