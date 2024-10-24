import {Pressable, SafeAreaView, Text, View} from "react-native";
import {useRouter} from "expo-router";

export default function Index() {
    const router = useRouter()

  return (
      <SafeAreaView>
          <View className="flex items-center justify-center flex-row gap-20">
              <Text onPress={() => {
                  router.replace("/(auth)/welcome")
              }} className="p-10 bg-black text-white">Auth</Text>
              {/*<Text onPress={() => router.replace("//(root)/(tabs)/home")} className="p-10 bg-black text-white">Home</Text>*/}
          </View>
      </SafeAreaView>
  );
}
