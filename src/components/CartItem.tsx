import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import type { ProductCartProps } from "../lib/redux/pickoraSlice";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

type CartItemProps = {
  product: ProductCartProps;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartItem({
  product,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemProps) {
  const { id, title, category, imageUrl, price, quantity } = product;
  const { colorScheme } = useColorScheme();

  return (
    <View className="bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-4 my-2 p-4">
      {/* Product Header */}
      <View className="flex-row items-center mb-4">
        <View className="relative mr-4">
          <Image
            source={{ uri: imageUrl }}
            className="w-24 h-24 rounded-xl"
            resizeMode="cover"
          />
          {quantity && quantity > 0 && (
            <View className="absolute -top-2 -right-2 bg-blue-500 rounded-full px-2 py-1">
              <Text className="text-white text-xs font-bold">{quantity}</Text>
            </View>
          )}
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {category}
          </Text>
        </View>
      </View>

      {/* Quantity Controls */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          ${quantity && (quantity * price).toFixed(2)}
        </Text>

        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full">
          <TouchableOpacity
            onPress={() => onDecrease(id)}
            className="p-2 rounded-l-full"
          >
            <AntDesign
              name="minus"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>

          <Text className="px-4 text-base font-semibold text-gray-900 dark:text-white">
            {quantity}
          </Text>

          <TouchableOpacity
            onPress={() => onIncrease(id)}
            className="p-2 rounded-r-full"
          >
            <AntDesign
              name="plus"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        onPress={() => onRemove(id)}
        className="self-start mb-4"
      >
        <View className="flex-row items-center">
          <FontAwesome name="trash-o" size={24} color="#EF4444" />
          <Text className="ml-2 text-red-500 font-medium">Remove Item</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
