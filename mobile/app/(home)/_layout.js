import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="subCategory"  />
      <Stack.Screen name="notifications"  />
      <Stack.Screen name="categories"/>
      <Stack.Screen name="account"/>
      <Stack.Screen name="login"/>
      <Stack.Screen name="signup"/>
       <Stack.Screen name="searchScreen"/>
      <Stack.Screen name="SplashScreen"/>
    </Stack>
  );
}