import { Link, router, Stack } from "expo-router";
import { Image, Paragraph, Separator } from "tamagui";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { SignInBanner } from "~/components/exports/ImageUriExports";
import { Email, Google } from "~/components/icons";

export default function SignIn() {
  return (
    <>
      <Stack.Screen options={{ title: "Sign In / up", headerShown: false }} />
      <Container
        backgroundColor="$color.gray9"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            uri: SignInBanner,
            width: 334,
            height: 458,
          }}
          animation="lazy"
        />
        <Container
          width="100%"
          padding="$0"
          marginVertical="$2"
          flexDirection="column"
          height="100%"
          justifyContent="flex-end"
          gap="$4"
        >
          <Link href="/google-auth" asChild>
            <Button
              color="$white"
              backgroundColor="$color.gray7"
              icon={Google}
              title="Google Sign In"
              size="$5"
            />
          </Link>
          <Link
            href={{
              pathname: "/password-auth",
              params: { schemestate: "Sign in" },
            }}
            asChild
          >
            <Button
              color="$white"
              icon={Email}
              justifyContent="center"
              alignItems="center"
              title="Sign In with Email"
              size="$5"
            />
          </Link>
          <Separator marginVertical={15} />
          <Paragraph alignSelf="center">
            Not a member?{" "}
            <Link
              href={{
                pathname: "/password-auth",
                params: { schemestate: "Sign up" },
              }}
              style={{ color: "#1DAC92", fontSize: 16 }}
            >
              Sign Up
            </Link>
          </Paragraph>
        </Container>
      </Container>
    </>
  );
}
