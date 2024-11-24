import { Text } from "react-native";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils/utils";

type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

type TextProps = BaseProps & Text["props"];

export const MyText = forwardRef<Text, TextProps>(
  ({ className, children, style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-base text-black dark:text-white", className)}
        style={style}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
