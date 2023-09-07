
export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    creationDate: Date;
} 

export const defaultProduct: Product = {
  name:"",
  description:"",
  price:0,
  creationDate: new Date()
}

export interface ProductContextType {
    products: Product[];
    currentProduct: Product; 
    setCurrentProduct:(product: any) => void;
    saveProduct: (product: any) => void;
    updateProduct: (product: any) => void;
    deleteProduct: (product: any) => void;
  };

  export const productContextDefaultValue: ProductContextType = {
    products: [],
    currentProduct: defaultProduct,
    setCurrentProduct: () => null,
    saveProduct: () => null,
    updateProduct: () => null,
    deleteProduct: () => null,
  }


