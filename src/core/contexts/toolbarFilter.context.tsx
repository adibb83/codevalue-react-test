import React from "react";
import { FilterContextDefaultValue, FilterContextType } from "../models/productFilter.model";

export const ToolBarFilterContext = React.createContext<FilterContextType>(FilterContextDefaultValue);

