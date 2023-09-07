import { useState } from "react";
import { ProductSortOptions } from "../models/productFilter.model";

function useFilterProducts() {
  const [eventSort, setEventSort] = useState<string>(ProductSortOptions[1].value);
  const [searchQuery, setSearchQuery] = useState<string>("");


  function setQuery(str:string){
    setSearchQuery(str);
  }

  function setSort(str:string){
    setEventSort(str);
  }



  return { eventSort, setSort, searchQuery, setQuery };
}

export default useFilterProducts;
