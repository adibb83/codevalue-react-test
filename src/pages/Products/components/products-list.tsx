import { useContext } from "react";
import ProductListItem from "./product-list-item";
import { ProductContext } from "../contexts/product.context";
import { Product } from "../models/product.model";
import SearchAppBar from "../../../core/components/toolbar";
import { ToolBarFilterContext } from "../../../core/contexts/toolbarFilter.context";
import useFilterProducts from "../../../core/hooks/useFilterProducts.hook";
import { FilterKeys } from "../../../core/models/productFilter.model";

export default function ProductsList() {
  const { products } = useContext(ProductContext);
  const { eventSort, setSort, searchQuery, setQuery } = useFilterProducts();

  function sortByKey(a:Product, b:Product): number {
    switch (eventSort) {
      case FilterKeys.Name:
       return a.name < b.name ? 1 : -1
       case FilterKeys.RecentlyAdded:
        return a.creationDate < b.creationDate ? 1 : -1
       case FilterKeys.Price:
          return a.price > b.price ? 1 : -1
      default:
        return 0
    }
  }

  return (
    <ToolBarFilterContext.Provider
      value={{eventSort, setSort, searchQuery, setQuery}}
    >
      <div className="products-list-container">
        <div className="searchAppBar-list-container">
          <SearchAppBar />
        </div>
        <div className="list-container">
          <div className="products-list">
            {products.filter((product)=> {
              return(
                product.name.toLowerCase().includes(searchQuery)
              )
            }).sort((a:Product, b:Product) => sortByKey(a, b)
            )
            .map((product: Product) => {
              return <ProductListItem key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </ToolBarFilterContext.Provider>
  );
}
