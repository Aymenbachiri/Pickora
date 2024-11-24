import { forwardRef } from "react";
import { MyText } from "./MyText";
import { cn } from "@/src/lib/utils/utils";
import { Text } from "react-native";

type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

type TextProps = BaseProps & Text["props"];

export const H1 = forwardRef<Text, TextProps>(
  ({ className, children, style, ...props }, ref) => {
    return (
      <MyText
        ref={ref}
        className={cn(
          "text-4xl font-bold tracking-tight text-black dark:text-white",
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </MyText>
    );
  }
);
