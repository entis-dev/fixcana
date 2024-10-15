import { Pressable, Text } from "react-native";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonStyles = cva(
    "px-4 py-2 rounded-md", // Base styles
    {
        variants: {
            intent: {
                primary: "bg-blue-500 text-white",
                secondary: "bg-gray-500 text-white",
                danger: "bg-red-500 text-white",
            },
            size: {
                small: "text-sm",
                medium: "text-base",
                large: "text-lg",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "medium",
        },
    }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
    children: React.ReactNode;
    onPress?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           intent,
                                           size,
                                           onPress,
                                           className,
                                       }) => {
    const mergedClassName = twMerge(clsx(buttonStyles({ intent, size }), className));

    return (
        <Pressable onPress={onPress} className={mergedClassName}>
            <Text>{children}</Text>
        </Pressable>
    );
};

export default Button;