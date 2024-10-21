import { Pressable, Text } from "react-native";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
    "rounded-full font-bold text-base flex items-center justify-center", // Base styles
    {
        variants: {
            variant: {
                primary: "bg-primary",
                secondary: "bg-secondary",
                destructive: "bg-destructive",
                outline: "border-2 border-primary",
                ghost: "bg-primary/10",
                link: "",
                icon: "",
                withIcon: "",
            },
            size: {
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

const buttonTextVariants = cva(
    "text-base font-bold",
    {
        variants: {
            variant: {
                primary: "text-white",
                secondary: "text-white",
                destructive: "text-white",
                outline: "text-primary",
                ghost: "text-primary",
                link: "underline",
                icon: "",
                withIcon: "",
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
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant,
                                           size,
                                           onPress,
                                           className,
                                       }) => {
    const mergedClassName = twMerge(clsx(buttonVariants({ variant, size }), className));
    const mergedTextClassName = twMerge(clsx(buttonTextVariants({ variant })));


    return (
        <Pressable onPress={onPress} className={mergedClassName}>
            <Text className={mergedTextClassName}>{children}</Text>
        </Pressable>
    );
};

export default Button;