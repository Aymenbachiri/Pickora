import { useUser } from "@clerk/clerk-expo";
import { useProduct } from "./useProduct";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useProductUpdate } from "../providers/ProductUpdateProvider ";
import { useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "../schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "react-native";
import { API_URL } from "@/src/components/common/Constants";

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
    throw error;
  }
}

export function useEditProduct({ id }: { id: string }) {
  const { product, loading: productLoading, error } = useProduct({ id });
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useProductUpdate();

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

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue(
        "category",
        product.category as "men" | "women" | "jewelery" | "electronics"
      );
      setValue("price", product.price);
      setValue("imageUrl", product.imageUrl);
    }
  }, [product, setValue]);

  useEffect(() => {
    if (user) {
      const creatorName = user.firstName || user.emailAddresses[0].emailAddress;
      setValue("creator", creatorName);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to edit products");
      return;
    }

    if (!id) {
      Alert.alert("Error", "Product ID is missing");
      return;
    }

    setLoading(true);
    try {
      await updateProduct(data, id);
      reset();
      triggerRefresh();
      Alert.alert("Success", "Product updated successfully!");
      router.push("/my-products");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWithAlerts = () => {
    if (Object.keys(errors).length > 0) {
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

  return {
    error,
    errors,
    control,
    productLoading,
    handleSubmitWithAlerts,
    loading,
  };
}
