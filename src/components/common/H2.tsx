import { forwardRef } from "react";
import { Text } from "react-native";
import { MyText } from "./MyText";
import { cn } from "@/src/lib/utils/utils";

type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

type TextProps = BaseProps & Text["props"];

export const H2 = forwardRef<Text, TextProps>(
  ({ className, children, style, ...props }, ref) => {
    return (
      <MyText
        ref={ref}
        className={cn(
          "text-2xl font-semibold tracking-tight text-black dark:text-white",
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
