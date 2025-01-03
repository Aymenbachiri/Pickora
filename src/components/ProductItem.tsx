import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import type { Product } from "../lib/types/types";
import { Link, type RelativePathString } from "expo-router";
import { useCart } from "../lib/hooks/useCart";

export default function ProductItem({ product }: { product: Product }) {
  const { title, description, category, imageUrl, price, creator } = product;
  const { handleAddToCart } = useCart();

  const handleClick = () => {
    handleAddToCart(product);
    Alert.alert(`${product.title} added to cart successfully!`);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="my-6 dark:bg-black dark:text-white"
    >
      <Link
        className="w-full h-full"
        href={`/products/${product.id}` as RelativePathString}
      >
        <View className="max-w-md w-full h-full">
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
              <TouchableOpacity
                onPress={handleClick}
                className="w-full bg-indigo-600 mb-3 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <Text className="text-center text-white font-bold">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Link>
    </ScrollView>
  );
}
