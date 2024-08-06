
import { router } from "expo-router";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { Spinner } from "tamagui";

import { Logout } from "../icons";


import { Button } from "~/tamagui.config";
import { supabase } from "~/utils/supabase";

export default function SignOutButton () {
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
    const SignOut = async () => {
        setStatus('submitting');
        const { error } = await supabase.auth.signOut();
        if (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setStatus('off');
        } else {
            ToastAndroid.show("Signed out", ToastAndroid.SHORT);
            console.log("signed out");
            router.replace("/");
            setStatus('submitted');
        }
      };
    return(
        <Button icon={status === 'submitting' ? () => <Spinner /> : Logout} backgroundColor='$color.error' onPress={() => SignOut()} disabled={status !== 'off'}>
            Sign Out
        </Button>
    )
}