import { router } from 'expo-router';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Label, Spinner, Form } from 'tamagui';

import { Button, Input } from '~/tamagui.config';
import { validationSchema } from '~/types/forms';
import { supabase } from '~/utils/supabase';




export default function SignUpForm() {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setStatus('submitting');
      const { data: { session }, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) ToastAndroid.show(error.message, ToastAndroid.SHORT);
      if (!session) ToastAndroid.show('Check your inbox for Verification', ToastAndroid.SHORT);
      if (session) {
        router.replace('/goals');
        setStatus('submitted');
      }
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Input
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
        />
        <Label color='$color.error' padding="$1">{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</Label>
        <Input
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
        />
        <Label color='$color.error' padding="$1">{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</Label>
        <Form.Trigger asChild disabled={status !== 'off'}>
          <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
              Submit
          </Button>
        </Form.Trigger>
    </Form>
  );
}