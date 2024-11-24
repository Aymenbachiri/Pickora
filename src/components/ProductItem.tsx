import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import type { Product } from "../lib/type/types";

export default function ProductItem({ product }: { product: Product }) {
  const { title, description, category, imageUrl, price, creator } = product;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="mt-6"
    >
      <View className="max-w-md w-full">
        <View className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl">
          <View className="relative">
            <View className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-75" />
            <Image
              source={{
                uri: imageUrl,
              }}
              alt="Product Image"
              className="w-full h-64 object-cover object-center relative z-10"
            />
            <View className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full z-20 transform rotate-12">
              <Text>NEW</Text>
            </View>
          </View>
          <View className="p-6">
            <Text className="text-3xl font-extrabold text-gray-800 mb-2">
              {title}
            </Text>
            <Text className="text-gray-600 mb-4">{description}</Text>
            <View className="flex flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-indigo-600">
                ${price}
              </Text>
              <View className="flex flex-row items-center">
                <Text className="text-yellow-400 text-lg">⭐</Text>
                <Text className="ml-1 text-gray-600">4.9 (120 reviews)</Text>
              </View>
            </View>
            <TouchableOpacity className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <Text className="text-center text-white font-bold">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
