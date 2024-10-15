import {SplashScreen, Stack} from "expo-router";
import "../styles/global.css"
import {NAV_THEME} from "@/lib/constants";
import {Theme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "@/lib/useColorScheme";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Platform} from "react-native";
import { StatusBar } from 'expo-status-bar';

const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const theme = await AsyncStorage.getItem('theme');
            if (Platform.OS === 'web') {
                // Adds the background color to the html element to prevent white background on overscroll.
                document.documentElement.classList.add('bg-background');
            }
            if (!theme) {
                await AsyncStorage.setItem('theme', colorScheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            const colorTheme = theme === 'dark' ? 'dark' : 'light';
            if (colorTheme !== colorScheme) {
                setColorScheme(colorTheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            setIsColorSchemeLoaded(true);
        })().finally(() => {
            SplashScreen.hideAsync();
        });
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    setColorScheme("dark")

  return (
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <Stack>
              <Stack.Screen name="index" options={{
                  title: 'Starter Base',
              }} />
          </Stack>
      </ThemeProvider>
  );
}
