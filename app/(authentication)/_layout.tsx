import { Stack } from 'expo-router';

export default function AuthenticationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
