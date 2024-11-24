import { View, ScrollView } from "react-native";

export default function ProductsSkeleton() {
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
        <View className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Image Skeleton */}
          <View className="w-full h-64 bg-gray-200 animate-pulse" />
          <View className="p-6 space-y-4">
            {/* Title Skeleton */}
            <View className="h-8 bg-gray-200 animate-pulse w-3/4 rounded-lg" />
            {/* Description Skeleton */}
            <View className="h-5 bg-gray-200 mt-2 animate-pulse w-full rounded-lg" />
            <View className="h-5 bg-gray-200 mt-2  animate-pulse w-5/6 rounded-lg" />
            {/* Price and Reviews Skeleton */}
            <View className="flex flex-row mt-2  items-center justify-between">
              <View className="h-8 bg-gray-200 mr-1 animate-pulse w-1/3 rounded-lg" />
              <View className="h-6 bg-gray-200 animate-pulse w-2/3 rounded-lg" />
            </View>
            {/* Button Skeleton */}
            <View className="h-12 bg-gray-200 mt-2  animate-pulse w-full rounded-lg" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
