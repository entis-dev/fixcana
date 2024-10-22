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
                h1: "text-5xl font-extrabold leading-[48px] font-plusjakarta-extrabold",
                h2: "text-[32px] font-plusjakarta-bold leading-9",
                h3: "text-2xl font-plusjakarta-semibold leading-loose",
                h4: "text-xl font-plusjakarta-semibold leading-7",
                p: "text-base font-plusjakarta-regular",
                lead: "text-xl font-plusjakarta-regular leading-7",
                large: "text-lg font-plusjakarta-semibold leading-7",
                small: "text-sm font-plusjakarta-medium leading-[14px]",
                subtle: "text-sm font-plusjakarta-regular leading-tight text-muted-foreground",
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