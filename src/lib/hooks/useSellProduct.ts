import { useEffect, useState } from "react";
import { type ProductFormData, productSchema } from "../schema/productSchema";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner-native";
import { API_URL } from "@/src/components/common/Constants";

async function registerProduct(data: ProductFormData): Promise<void> {
  console.log("Registering product with data:", JSON.stringify(data, null, 2));

  try {
    console.log("Sending request to API URL:", API_URL);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);

      const errorMessage = errorText
        ? JSON.parse(errorText)?.error || errorText
        : `Failed to add product: ${response.statusText}`;

      console.error("Detailed error message:", errorMessage);
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log("Response data:", JSON.stringify(responseData, null, 2));

    return responseData;
  } catch (error) {
    console.error("Comprehensive error log:");
    console.error(
      "Error type:",
      error instanceof Error ? error.name : "Unknown error type"
    );
    console.error(
      "Error message:",
      error instanceof Error ? error.message : error
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace available"
    );
    throw error;
  }
}

export function useSellProduct() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
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
    mode: "onChange", // Validate on every change
  });

  useEffect(() => {
    if (user) {
      const creatorName = user.firstName || user.emailAddresses[0].emailAddress;
      setValue("creator", creatorName);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    console.log("Form submission initiated");
    console.log("Form validity:", isValid);
    console.log("Form errors:", errors);

    if (!user) {
      console.error("No user logged in");
      toast.error("You must be logged in to sell products");
      return;
    }

    // Log all form data before submission
    console.log("Submitted form data:", JSON.stringify(data, null, 2));

    setLoading(true);
    try {
      await toast.promise(registerProduct(data), {
        loading: "Adding product...",
        success: () => {
          console.log("Product added successfully");
          return "Product added successfully!";
        },
        error: (error) => {
          console.error("Product submission error:", error);
          return "Error adding product";
        },
      });

      reset();
      router.push("/profile");
    } catch (error) {
      console.error("Final catch block error:", error);
      toast.error("An unexpected error occurred");
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
