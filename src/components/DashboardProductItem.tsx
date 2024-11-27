import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import type { Product } from "../lib/types/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { deleteProduct } from "../lib/helpers/deleteProduct";

export default function DashboardProductItem({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (productId: string) => void;
}) {
  const { id, title, description, category, imageUrl, price } = product;
  const handleDelete = async () => {
    // Show confirmation dialog
    Alert.alert("Delete Product", `Are you sure you want to delete ${title}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteProduct(id);
          if (success) {
            // Call the onDelete callback to update the parent component's state
            onDelete(id);
            Alert.alert("Success", "Product deleted successfully");
          } else {
            Alert.alert("Error", "Failed to delete product");
          }
        },
      },
    ]);
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
            <View className="flex justify-center items-center gap-4 flex-row">
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-600 text-red-600 p-3 font-bold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <FontAwesome6 name="trash-can" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className=" bg-green-600 text-white p-3 font-bold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <FontAwesome6 name="edit" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
