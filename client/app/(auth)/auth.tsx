import React from 'react';
import {Pressable, SafeAreaView, View} from "react-native";
import Header from "@/components/ui/header";
import Text from "@/components/ui/text";

const Auth = () => {
    return (
        <SafeAreaView>
            <View className="flex items-center justify-center h-full p-4">
                <View className="flex items-center justify-center h-full">
                    <Header title="Join Nucleus" text="Start building your design system with our component library"/>
                </View>
                <View className="flex-row justify-center items-center flex-wrap gap-0.5">
                    <Text variant="subtle">Al continuar aceptas nuestros</Text>
                    <View className="flex-row gap-0.5">
                        <Pressable variant="link"><Text variant="subtle" className="text-foreground font-plusjakarta-semibold">Términos de Servicio</Text></Pressable>
                        <Text variant="subtle">y</Text>
                        <Pressable variant="link"><Text variant="subtle" className="text-foreground font-plusjakarta-semibold">Política de Privacidad</Text></Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const LegalLink = ({children}) => {

}

export default Auth;