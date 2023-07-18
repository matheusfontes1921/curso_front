import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useEffect } from "react";
import useRequests from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ProductType } from "../types/ProductType";
import { URL_PRODUCT } from "../../../shared/constants/urls";

const Product = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();
  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);
  return products.map((products) => <div key={products.id}>{products.name}</div>);
};

export default Product;
