import { useContext } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../../Not-Found/PageNotFound";
import { ProductContext } from "../contexts/product.context";

export default function ProductDetail() {
  const { products } = useContext(ProductContext);
  const { id } = useParams();

  if (Number.isNaN(id)) {
    return <PageNotFound />;
  }

  return <div>
    {
    products.filter(product => product.id === Number.parseInt(id || ""))
    .map(product => {
        return <div key={product.id}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      })}
    </div>;
}
