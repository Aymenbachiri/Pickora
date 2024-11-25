import { useEffect, useState } from "react";
import type { Product } from "../type/types";
import { API_URL } from "@/src/components/common/Constants";

export function useProduct({ id }: { id: string }) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProduct() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
}
