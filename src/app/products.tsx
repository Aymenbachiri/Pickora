import { ScrollView } from "react-native";
import { H1 } from "../components/common/H1";
import { MyView } from "../components/common/MyView";
import { MyText } from "../components/common/MyText";
import ProductItem from "../components/ProductItem";
import { useProducts } from "../lib/hooks/useProducts";
import ProductsSkeleton from "../components/ProductsSkeleton";

export default function Products() {
  const { products, loading, error } = useProducts();

  if (error) {
    return (
      <MyView>
        <MyText>Error: {error}</MyText>
      </MyView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-black">
      <MyView>
        <H1 className="text-center mt-2">Our Latest Products</H1>
        <MyText className="mt-4">
          Explore our range of high-quality products, each carefully selected to
          meet your needs.
        </MyText>
      </MyView>
      {loading && [...Array(5)].map(() => <ProductsSkeleton />)}
      {products.map((product) => (
        <ProductItem product={product} key={Math.random()} />
      ))}
    </ScrollView>
  );
}
