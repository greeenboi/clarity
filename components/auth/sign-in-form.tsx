import { router } from "expo-router";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { Spinner, Form } from "tamagui";

import { Button, Input } from "~/tamagui.config";
import { supabase } from "~/utils/supabase";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off",
  );

  async function signInWithEmail() {
    setStatus("submitting");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("signed in", ToastAndroid.SHORT);
      router.replace("/goals");
      setStatus("submitted");
    }
  }

  return (
    <Form
      onSubmit={signInWithEmail}
      style={{ display: "flex", gap: 12, flexDirection: "column" }}
    >
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
      />

      <Form.Trigger asChild disabled={status !== "off"}>
        <Button icon={status === "submitting" ? () => <Spinner /> : undefined}>
          Submit
        </Button>
      </Form.Trigger>
    </Form>
  );
}
