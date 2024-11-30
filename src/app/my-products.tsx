import { View, Text, ScrollView } from "react-native";
import { MyView } from "../components/common/MyView";
import { H1 } from "../components/common/H1";
import { MyText } from "../components/common/MyText";
import { useMyProducts } from "../lib/hooks/useMyProducts";
import ProductsSkeleton from "../components/ProductsSkeleton";
import { H2 } from "../components/common/H2";
import { useUser } from "@clerk/clerk-expo";
import DashboardProductItem from "../components/DashboardProductItem";

export default function MyProducts() {
  const { user } = useUser();
  const creator = user?.emailAddresses[0].emailAddress as string;
  const { products, setProducts, loading, error } = useMyProducts({
    creator,
  });

  const handleDeleteProduct = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    );
  };

  if (error) {
    return (
      <MyView>
        <MyText className="text-red-600">Error: {error}</MyText>
      </MyView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-black">
      <MyView>
        <H1 className="text-center mt-2">My Products</H1>
        <MyText className="mt-4">
          Explore your products, where you can easily edit them and delete them.
        </MyText>
      </MyView>
      {loading &&
        [...Array(5)].map(() => <ProductsSkeleton key={Math.random()} />)}
      {products.length > 0 ? (
        products.map((product) => (
          <DashboardProductItem
            product={product}
            key={product.id}
            onDelete={handleDeleteProduct}
          />
        ))
      ) : (
        <H2>You haven't created any products yet.</H2>
      )}
    </ScrollView>
  );
}
