import {Text as RNText} from "react-native";
import {cva, VariantProps} from "class-variance-authority";
import type from "ajv/lib/vocabularies/jtd/type";
import React from "react";
import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";

const textStyles = cva(
    "text-foreground",
    {
        variants: {
            variant: {
                h1: "text-5xl font-extrabold leading-[48px]",
                h2: "text-[32px] font-bold leading-9",
                h3: "text-2xl font-semibold leading-loose",
                h4: "text-xl font-semibold leading-7",
                p: "text-base font-normal",
                lead: "text-xl font-normal leading-7",
                large: "text-lg font-semibold leading-7",
                small: "text-sm font-medium leading-[14px]",
                subtle: "text-sm font-normal leading-tight text-muted-foreground",
            }
        },
        defaultVariants: {
            variant: "p"
        }
    }
)

interface TextProps extends VariantProps<typeof textStyles> {
    children: React.ReactNode;
    className?: string;
}

const Text: React.FC<TextProps> = ({ children, variant, className}) => {
    const mergedClassName = twMerge(clsx(textStyles({variant}), className))
    return (
        <RNText className={mergedClassName}>{children}</RNText>
    )
}

export default Text;