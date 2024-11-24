import { cn } from "@/src/lib/utils/utils";
import { forwardRef } from "react";
import { View } from "react-native";

type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

type ViewProps = BaseProps & View["props"];

export const MyView = forwardRef<View, ViewProps>(
  ({ className, children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-1", className)}
        style={style}
        {...props}
      >
        {children}
      </View>
    );
  }
);
