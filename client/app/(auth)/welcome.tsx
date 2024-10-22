import React from "react";
import {SafeAreaView, View} from "react-native";
import Text from "@/components/ui/text";
import Button from "@/components/ui/button";
import Icon from "@expo/vector-icons/FontAwesome6";
import {Href, useRouter} from "expo-router";

const Welcome = () => {
    const router = useRouter()

    return (
        <SafeAreaView>
            <View className="w-full h-full flex flex-col items-center justify-center px-3 gap-6">
                    <Text variant="h1" className="text-center">Bienvenido {"\n"} a Fixcana</Text>
                <View className=""></View>
                <View className="w-full flex items-center justify-center gap-3">
                    { AuthPathList.map((button) => (
                        <Button
                            variant={button.button}
                            size="fullWidth"
                            icon={button.icon && button.icon}
                            onPress={() => (router.replace(button.path))}
                        >Continúa con { button.name }</Button>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}

type AuthPath = {
    id: number,
    name: string,
    button: "outline" | "ghost",
    icon?: typeof Icon,
    path: Href
}

const AuthPathList: Array<AuthPath> = [
    {
        id: 0,
        name: "Apple",
        button: "outline",
        icon: <Icon name="apple" size={20}/>,
        path: "/"
    },
    {
        id: 1,
        name: "Google",
        button: "outline",
        icon: <Icon name="google" size={20}/>,
        path: "/"
    },
    {
        id: 2,
        name: "Facebook",
        button: "outline",
        icon: <Icon name="facebook" size={20}/>,
        path: "/"
    },
    {
        id: 3,
        name: "Correo Electrónico",
        button: "ghost",
        path: "/(auth)/auth"
    },
]

export default Welcome;