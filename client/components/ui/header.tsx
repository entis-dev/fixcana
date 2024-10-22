import React from 'react';
import {View} from "react-native";
import Text from "@/components/ui/text";

type HeaderProps = {
    title: string;
    text: string;
}

const Header: React.FC<HeaderProps> = ({title, text}) => {
    return (
        <View className="flex items-center justify-between px-2 py-6">
            <Text variant="h2" className="text-slate-900 dark:text-foreground">{title}</Text>
            <Text className="text-muted-foreground text-center">{text}</Text>
        </View>
    );
};

export default Header;