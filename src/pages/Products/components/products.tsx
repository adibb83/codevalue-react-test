

import ProductsList from "./products-list";
import ProductForm from "./product-form";

export default function Products() {
  return (
    <div className="main-container">
      <ProductsList />
      <ProductForm />
    </div>
  );
}