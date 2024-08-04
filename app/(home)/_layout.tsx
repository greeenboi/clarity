import { Stack, Redirect } from 'expo-router';

import { useAuthContext } from '~/providers/AuthContext';

export default function HomeLayout() {
  const { session } = useAuthContext();
  console.log('Session:', session);
  if (!session || !session.user) {
    console.log('Redirecting to sign-in');
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
