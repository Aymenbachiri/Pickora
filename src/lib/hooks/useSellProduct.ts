import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { type ProductFormData, productSchema } from "../schema/productSchema";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/src/components/common/Constants";
import { useProducts } from "../providers/ProductsContext";

async function registerProduct(data: ProductFormData): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
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
        : `Failed to add product: ${response.statusText}`;

      Alert.alert("Error", errorMessage);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    Alert.alert(
      "Error",
      error instanceof Error ? error.message : "An error occurred"
    );
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}

export function useSellProduct() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { fetchProducts } = useProducts();

  const {
    control,
    register,
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

  useEffect(() => {
    if (user) {
      const creatorName = user.emailAddresses[0].emailAddress;
      setValue("creator", creatorName);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to sell products");
      return;
    }

    setLoading(true);
    try {
      await registerProduct(data);

      // Refetch products after successful product addition
      await fetchProducts();

      Alert.alert("Success", "Product added successfully!");
      reset();
      router.push("/profile");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
  };
}
