import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductUpdateContextType {
  shouldRefreshProducts: boolean;
  triggerRefresh: () => void;
}

const ProductUpdateContext = createContext<ProductUpdateContextType>({
  shouldRefreshProducts: false,
  triggerRefresh: () => {},
});

export const ProductUpdateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [shouldRefreshProducts, setShouldRefreshProducts] = useState(false);

  const triggerRefresh = () => {
    setShouldRefreshProducts(true);
  };

  return (
    <ProductUpdateContext.Provider
      value={{ shouldRefreshProducts, triggerRefresh }}
    >
      {children}
    </ProductUpdateContext.Provider>
  );
};

export const useProductUpdate = () => useContext(ProductUpdateContext);
