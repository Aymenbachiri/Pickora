import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { H2 } from "@/src/components/common/H2";
import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import { useProduct } from "@/src/lib/hooks/useProduct";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { Toaster, toast } from "sonner-native";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "@/src/components/common/Constants";
import { ProductFormData, productSchema } from "@/src/lib/schema/productSchema";

async function updateProduct(data: ProductFormData, id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorMessage = errorText
        ? JSON.parse(errorText)?.error || errorText
        : `Failed to update product: ${response.statusText}`;

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Product update error:", error);
    throw error;
  }
}

export default function EditProduct() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading: productLoading, error } = useProduct({ id });
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "men",
      imageUrl: "",
      price: 0,
      creator: "Unknown Creator",
    },
    mode: "onChange",
  });

  // Populate form with existing product data when loaded
  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("price", product.price);
      setValue("imageUrl", product.imageUrl);
    }
  }, [product, setValue]);

  // Set creator name when user is available
  useEffect(() => {
    if (user) {
      const creatorName = user.firstName || user.emailAddresses[0].emailAddress;
      setValue("creator", creatorName);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      toast.error("You must be logged in to edit products");
      return;
    }

    if (!id) {
      toast.error("Product ID is missing");
      return;
    }

    setLoading(true);
    try {
      await toast.promise(updateProduct(data, id), {
        loading: "Updating product...",
        success: () => {
          reset();
          router.push("/my-products");
          return "Product updated successfully!";
        },
        error: (error) => {
          console.error("Product update error:", error);
          return "Error updating product";
        },
      });
    } catch (error) {
      console.error("Final catch block error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWithLogging = () => {
    if (Object.keys(errors).length > 0) {
      console.error("Form errors before submission:", errors);

      Alert.alert(
        "Form Validation Errors",
        Object.entries(errors)
          .map(([field, error]) => `${field}: ${error.message}`)
          .join("\n")
      );
      return;
    }

    handleSubmit(onSubmit)();
  };

  if (error) {
    return (
      <MyView className="flex-1 flex justify-center items-center p-4">
        <Text className="text-red-500 text-center">Error: {error}</Text>
      </MyView>
    );
  }

  if (productLoading) {
    return (
      <MyView className="flex-1 bg-white p-4 dark:bg-black">
        <MyView className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 animate-pulse" />
        <MyView className="w-3/4 h-6 bg-gray-300 dark:bg-gray-600  rounded mb-2 animate-pulse" />
        <MyView className="w-1/2 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 animate-pulse" />
        <MyView className="w-full h-24 bg-gray-300 dark:bg-gray-600 rounded mb-4 animate-pulse" />
        <MyView className="w-3/4 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg mt-8 animate-pulse" />
      </MyView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4 dark:bg-black">
      <Toaster position="bottom-center" />
      <MyView className="flex flex-col gap-4 justify-center items-center">
        {/* Title */}
        <MyView className="flex w-full flex-col gap-2">
          <H2>Title</H2>
          <Controller
            control={control}
            name="title"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                className="border rounded-md w-full p-2 dark:bg-white"
                placeholder="Enter product title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderColor: error ? "red" : "black",
                  borderWidth: 1,
                }}
              />
            )}
          />
          {errors.title && (
            <MyText className="text-red-600">{errors.title.message}</MyText>
          )}
        </MyView>

        {/* Description */}
        <MyView className="flex w-full flex-col gap-2">
          <H2>Description</H2>
          <Controller
            control={control}
            name="description"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                className="border rounded-md w-full p-2 dark:bg-white"
                multiline
                numberOfLines={4}
                placeholder="Enter product description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderColor: error ? "red" : "black",
                  borderWidth: 1,
                }}
              />
            )}
          />
          {errors.description && (
            <MyText className="text-red-600">
              {errors.description.message}
            </MyText>
          )}
        </MyView>

        {/* Category */}
        <MyView className="flex w-full flex-col gap-2">
          <H2>Category</H2>
          <MyView className="dark:bg-white">
            <Controller
              control={control}
              name="category"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={{
                    borderColor: error ? "red" : "black",
                    borderWidth: 1,
                  }}
                >
                  <Picker.Item label="Select a category" value="" />
                  <Picker.Item label="Electronics" value="electronics" />
                  <Picker.Item label="Men" value="men" />
                  <Picker.Item label="Women" value="women" />
                  <Picker.Item label="Jewelery" value="jewelery" />
                </Picker>
              )}
            />
          </MyView>
          {errors.category && (
            <MyText className="text-red-600">{errors.category.message}</MyText>
          )}
        </MyView>

        {/* Price */}
        <MyView className="flex w-full flex-col gap-2">
          <H2>Price</H2>
          <Controller
            control={control}
            name="price"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                className="border rounded-md w-full p-2 dark:bg-white"
                keyboardType="decimal-pad"
                placeholder="Enter price"
                value={value?.toString() || ""}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                onBlur={onBlur}
                style={{
                  borderColor: error ? "red" : "black",
                  borderWidth: 1,
                }}
              />
            )}
          />
          {errors.price && (
            <MyText className="text-red-600">{errors.price.message}</MyText>
          )}
        </MyView>

        {/* Image URL */}
        <MyView className="flex w-full flex-col gap-2">
          <H2>Image URL</H2>
          <Controller
            control={control}
            name="imageUrl"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                className="border rounded-md w-full p-2 h-10 dark:bg-white"
                placeholder="Enter image URL"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderColor: error ? "red" : "black",
                  borderWidth: 1,
                }}
              />
            )}
          />
          {errors.imageUrl && (
            <MyText className="text-red-600">{errors.imageUrl.message}</MyText>
          )}
        </MyView>

        <Button
          title="Update Product"
          onPress={handleSubmitWithLogging}
          disabled={loading}
        />

        <TouchableOpacity onPress={handleSubmitWithLogging}>
          {loading && (
            <AntDesign
              className="animate-spin"
              name="loading1"
              size={24}
              color="black"
            />
          )}
          <H2>Update Product</H2>
        </TouchableOpacity>
      </MyView>
    </ScrollView>
  );
}
