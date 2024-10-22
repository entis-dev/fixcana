import {Pressable, Text, View} from "react-native";
import clsx from "clsx";
import {twMerge} from "tailwind-merge";
import {cva, VariantProps} from "class-variance-authority";
import Icon from '@expo/vector-icons/FontAwesome6';
import React from "react";
import {cn} from "@/lib/utils";

const buttonVariants = cva(
    "rounded-full flex items-center justify-center flex-row gap-2", // Base styles
    {
        variants: {
            variant: {
                primary: "bg-primary",
                secondary: "bg-secondary",
                destructive: "bg-destructive",
                outline: "border-2 border-primary",
                ghost: "bg-primary/10",
                link: "",
            },
            size: {
                icon: "w-12 h-12",
                small: "h-8 px-4",
                medium: "h-10 px-6",
                large: "h-12 px-8",
                fullWidth: "h-12 self-stretch"
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "medium",
        },
    }
);

const buttonIconContainer = cva(
    "",
    {
        variants: {
            size: {
                icon: "",
                small: "",
                medium: "",
                large: "",
                fullWidth: ""
            },
        },
        defaultVariants: {
            size: "medium",
        },
    }
)

const buttonTextVariants = cva(
    "text-base font-plusjakarta-bold",
    {
        variants: {
            variant: {
                primary: "text-white",
                secondary: "text-white",
                destructive: "text-white",
                outline: "text-primary",
                ghost: "text-primary",
                link: "underline text-foreground",
            }
        },
        defaultVariants: {
            variant: "primary"
        }
    }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    onPress?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant,
                                           icon,
                                           size,
                                           onPress,
                                           className,
                                       }) => {
    const mergedClassName = twMerge(clsx(buttonVariants({variant, size}), className));
    const mergedTextClassName = twMerge(clsx(buttonTextVariants({variant})));
    const mergedIconContainerClassName = twMerge(clsx(buttonIconContainer({size})));

    return (
        <Pressable onPress={onPress} className={
            cn(
                mergedClassName,
                (icon && size === "fullWidth") && "justify-between px-4"
            )}>
            {icon ? <View className={mergedIconContainerClassName}>
                <Text className={mergedTextClassName}>{icon}</Text>
            </View> : null}
            <Text className={mergedTextClassName}>{children}</Text>
            {(icon && size === "fullWidth") &&
                <View/>
            }
        </Pressable>
    );
};

export default Button;