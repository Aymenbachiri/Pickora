import { FlatList, ScrollView } from "react-native";
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
    <MyView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <MyView>
          <H1 className="text-center mt-2">Our Latest Products</H1>
          <MyText className="my-4">
            Explore our range of high-quality products, each carefully selected
            to meet your needs.
          </MyText>
        </MyView>
      </ScrollView>
      <FlatList
        data={loading ? [...Array(5)] : products}
        renderItem={({ item, index }) =>
          loading ? <ProductsSkeleton /> : <ProductItem product={item} />
        }
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.id.toString()
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </MyView>
  );
}
