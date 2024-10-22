import {SplashScreen, Stack} from "expo-router";
import "../styles/global.css"
import {NAV_THEME} from "@/lib/constants";
import {Theme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "@/lib/useColorScheme";
import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Platform} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {useFonts} from "expo-font";

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
    const [loaded] = useFonts({
        "PlusJakartaSans-Bold": require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        "PlusJakartaSans-BoldItalic": require('../assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
        "PlusJakartaSans-ExtraBold": require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
        "PlusJakartaSans-ExtraBoldItalic": require('../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
        "PlusJakartaSans-ExtraLight": require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
        "PlusJakartaSans-ExtraLightItalic": require('../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf'),
        "PlusJakartaSans-Italic": require('../assets/fonts/PlusJakartaSans-Italic.ttf'),
        "PlusJakartaSans-Light": require('../assets/fonts/PlusJakartaSans-Light.ttf'),
        "PlusJakartaSans-LightItalic": require('../assets/fonts/PlusJakartaSans-LightItalic.ttf'),
        "PlusJakartaSans-Medium": require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        "PlusJakartaSans-MediumItalic": require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
        "PlusJakartaSans-Regular": require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        "PlusJakartaSans-SemiBold": require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        "PlusJakartaSans-SemiBoldItalic": require('../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
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

    setColorScheme("light")

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
