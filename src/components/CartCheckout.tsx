import { TouchableOpacity, View } from "react-native";
import { H2 } from "./common/H2";
import { Link } from "expo-router";
import { useCart } from "../lib/hooks/useCart";
import { MyView } from "./common/MyView";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function CartCheckout() {
  const { totalPrice, handleResetCart } = useCart();
  const { colorScheme } = useColorScheme();

  return (
    <MyView className="bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-4 my-2 p-4">
      {/* Cart Summary */}
      <View className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <View className="flex-row justify-between mb-2">
          <H2 className="text-gray-500 dark:text-gray-400">Subtotal</H2>
          <H2 className="font-semibold text-gray-900 dark:text-white">
            ${totalPrice.toFixed(2)}
          </H2>
        </View>

        <View className="flex-row justify-between mb-2">
          <H2 className="text-gray-500 dark:text-gray-400">Shipping</H2>
          <H2 className="font-semibold text-green-600">Free</H2>
        </View>

        <View className="flex-row justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <H2 className="text-lg font-bold text-gray-900 dark:text-white">
            Total
          </H2>
          <View className="flex-row items-baseline">
            <H2 className="text-xs text-gray-500 mr-1">USD</H2>
            <H2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalPrice.toFixed(2)}
            </H2>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mt-4 flex-row space-x-4">
        <TouchableOpacity
          onPress={handleResetCart}
          className="flex-1 bg-red-500 rounded-lg py-3 items-center"
        >
          <H2 className="text-white font-semibold">Reset Cart</H2>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-blue-500 rounded-lg py-3 items-center"
          onPress={() => console.log("Checkout pressed")}
        >
          <H2 className="text-white font-semibold">Checkout</H2>
        </TouchableOpacity>
      </View>

      {/* Continue Shopping Link */}
      <Link
        href="/products"
        className="mt-4 flex justify-center gap-6 bg-gray-100 dark:bg-gray-800 rounded-lg py-3 items-center flex-row"
      >
        <H2 className="text-gray-900 text-center dark:text-white font-semibold">
          Continue Shopping
        </H2>
        <AntDesign
          name="arrowright"
          size={24}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </Link>
    </MyView>
  );
}
