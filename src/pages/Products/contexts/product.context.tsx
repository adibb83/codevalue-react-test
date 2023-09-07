import React from "react";
import { ProductContextType, productContextDefaultValue } from "../models/product.model";

export const ProductContext = React.createContext<ProductContextType>(productContextDefaultValue);

