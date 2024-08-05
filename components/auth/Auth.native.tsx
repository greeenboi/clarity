// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin'
// import { router } from 'expo-router'
// import { ToastAndroid } from 'react-native'

// import { supabase } from '~/utils/supabase'
  
//   export default function GoogleSignIn () {
//     const ClientId = process.env.EXPO_GOOGLE_CLIENT_ID
//     GoogleSignin.configure({
//       scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//       webClientId: ClientId,
//     })
  
//     return (
//       <GoogleSigninButton
//         size={GoogleSigninButton.Size.Wide}
//         color={GoogleSigninButton.Color.Dark}
//         onPress={async () => {
//           try {
//             await GoogleSignin.hasPlayServices()
//             const userInfo = await GoogleSignin.signIn()
//             if (userInfo.idToken) {
//               const { data, error } = await supabase.auth.signInWithIdToken({
//                 provider: 'google',
//                 token: userInfo.idToken,
//               })
//               console.log(error, data)
//               ToastAndroid.show('signed in', ToastAndroid.SHORT)
//               router.replace('/details')
//             } else {
//               throw new Error('no ID token present!')
//             }
//           } catch (error: any) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//               // user cancelled the login flow
//               ToastAndroid.show('cancelled', ToastAndroid.SHORT)
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 // operation (e.g. sign in) is in progress already
//                 ToastAndroid.show('in progress', ToastAndroid.SHORT)
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//               // play services not available or outdated
//                 ToastAndroid.show('play services not available', ToastAndroid.SHORT)
//             } else {
//               // some other error happened\
//                 ToastAndroid.show(error, ToastAndroid.SHORT)
//             }
//           }
//         }}
//       />
//     )
//   }