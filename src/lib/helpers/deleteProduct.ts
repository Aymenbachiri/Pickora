import { API_URL } from "@/src/components/common/Constants";

export async function deleteProduct(productId: string) {
  if (!productId) return false;

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}
