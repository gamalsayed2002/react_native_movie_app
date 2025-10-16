import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";
export default function RootLayout() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack>
    </SafeAreaView>
  );
}
