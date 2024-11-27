import { useEffect, useState } from "react";
import { Product } from "../types/types";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "@/src/components/common/Constants";

export function useMyProducts({ creator }: { creator: string | null }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      const res = await fetch(
        `${API_URL}/dashboard/products?creator=${creator}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [creator]);

  return { products, loading, error, setProducts };
}
