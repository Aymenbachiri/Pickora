import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  type ProductCartProps,
} from "../redux/pickoraSlice";
import type { RootState } from "../redux/store";
import { Alert } from "react-native";

export function useCart() {
  const products: ProductCartProps[] = useSelector(
    (state: RootState) => state.shop.products
  );
  const dispatch = useDispatch();

  const totalPrice = products.reduce((acc, product) => {
    acc += product.price * product.quantity!;
    return acc;
  }, 0);

  const handleResetCart = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to clear your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(clearCart()) },
      ],
      { cancelable: true }
    );
  };

  const handleAddToCart = (product: ProductCartProps) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return {
    cart: products,
    length: products.length,
    products,
    totalPrice,
    handleAddToCart,
    handleResetCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleRemoveFromCart,
  };
}
