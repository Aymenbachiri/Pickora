import { ScrollView } from "react-native";
import { useCart } from "../lib/hooks/useCart";
import { H1 } from "../components/common/H1";
import { CartItem } from "../components/CartItem";
import { MyView } from "../components/common/MyView";
import CartCheckout from "../components/CartCheckout";

export default function Cart() {
  const {
    products,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleRemoveFromCart,
  } = useCart();

  if (products.length === 0) {
    return (
      <MyView className="flex-1 bg-white dark:bg-black w-full h-full justify-center items-center">
        <H1 className="text-black dark:text-white">
          Your cart is empty, please add some products to your cart.
        </H1>
      </MyView>
    );
  } else {
    return (
      <ScrollView className="flex-1 bg-white dark:bg-black w-full h-full">
        <H1>My Cart</H1>
        {products.map((product) => (
          <CartItem
            key={product.id}
            onDecrease={handleDecreaseQuantity}
            onIncrease={handleIncreaseQuantity}
            onRemove={handleRemoveFromCart}
            product={product}
          />
        ))}
        <CartCheckout />
      </ScrollView>
    );
  }
}
