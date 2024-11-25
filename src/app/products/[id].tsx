import { H1 } from "@/src/components/common/H1";
import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import { useProduct } from "@/src/lib/hooks/useProduct";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, error } = useProduct({ id });

  if (error) {
    return (
      <MyView className="flex-1 flex justify-center items-center p-4">
        <H1 className="text-red-500 text-center">Error: {error}</H1>
      </MyView>
    );
  }

  if (loading) {
    return (
      <MyView className="flex-1 bg-white p-4">
        <MyView className="w-full h-64 bg-gray-300 rounded-lg mb-4 animate-pulse" />
        <MyView className="w-3/4 h-6 bg-gray-300 rounded mb-2 animate-pulse" />
        <MyView className="w-1/2 h-6 bg-gray-300 rounded mb-4 animate-pulse" />
        <MyView className="w-full h-24 bg-gray-300 rounded mb-4 animate-pulse" />
        <MyView className="w-3/4 h-12 bg-gray-300 rounded-lg mt-8 animate-pulse" />
      </MyView>
    );
  }

  return (
    <MyView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: product?.imageUrl }}
        className="w-full h-64 rounded-lg mb-4"
        resizeMode="contain"
        style={{ borderRadius: 8 }}
      />
      <MyText className="text-2xl font-bold text-gray-800 mb-2">
        {product?.title}
      </MyText>
      <MyText className="text-xl text-green-600 mb-4">
        ${product?.price.toFixed(2)}
      </MyText>
      <MyText className="text-gray-700">{product?.description}</MyText>
      <MyView className="mt-8">
        <MyText className="bg-blue-500 text-white py-3 text-center rounded-lg">
          Add to Cart
        </MyText>
      </MyView>
    </MyView>
  );
}
