import { router } from "expo-router"
import { useState } from "react"
import { ToastAndroid } from "react-native"
import { Button, Form, Input, Spinner } from "tamagui"

import { supabase } from "~/utils/supabase"


export default function SignInForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')

    async function signInWithEmail() {
        setStatus('submitting')
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
    
        if (error){
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('signed in', ToastAndroid.SHORT)
          router.replace('/details')
          setStatus('submitted')
        }
    }

    return(
        <Form
            onSubmit={signInWithEmail}
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

            <Form.Trigger asChild disabled={status !== 'off'}>
                <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                Submit
                </Button>
            </Form.Trigger>
        </Form>
    )
}