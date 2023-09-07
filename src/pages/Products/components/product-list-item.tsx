import { useContext } from "react";
import { Product } from "../models/product.model";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ProductContext } from "../contexts/product.context";

export default function ProductListItem(product: Product) {
  const { deleteProduct, setCurrentProduct, currentProduct } =
    useContext(ProductContext);

  return (
    <div className="container">
      <div
        style={{ backgroundColor: product.id === currentProduct.id  ? "#d6d6d6" : "" }}
        className={"product-item"}
        onClick={() => {
          setCurrentProduct(product);
        }}
      >
        <div className="img-container">
          <img
            src="https://media.shoesonline.co.il/2022/10/men-Brooks-Ghost-14__1103691D488-1.jpg"
            alt=""
          />
        </div>
        <div className="product-details-container">
          <h4>{product.name}</h4>
          <span>{product.description}</span>
        </div>
        <div className="action-container">
          <h3>
            {product.price}
            <AttachMoneyIcon className="material-icon" />
          </h3>
          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "1rem" }}
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(product);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
