import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProductContext } from "../../pages/Products/contexts/product.context";
import { data } from "../../DB/products.mock";
import { defaultProduct } from "../../pages/Products/models/product.model";
import useRequestProducts from "../hooks/useRequestDelay.hook";
import PageNotFound from "../../pages/Not-Found/PageNotFound";
import ProductDetail from "../../pages/Products/components/product-detail";
import Products from "../../pages/Products/components/products";
import Header from "./header";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Layout() {
  const {
    data: products,
    updateRecord,
    insertRecord,
    deleteRecord,
    doneCallBack,
    currentRecord,
    setActiveRecord,
  } = useRequestProducts(3000, data, defaultProduct);
  return (
    <div className="layout">
      <ProductContext.Provider
        value={{
          products,
          saveProduct: insertRecord,
          updateProduct: updateRecord,
          deleteProduct: deleteRecord,
          currentProduct: currentRecord,
          setCurrentProduct: setActiveRecord,
        }}
      >
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="/" element={<Products />} />
              <Route path="/:products" element={<Products />} />
              <Route path="/:products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </BrowserRouter>
        {!doneCallBack && (
          <CircularProgress className="loader" color="secondary" />
        )}
        <ToastContainer
          position="bottom-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ProductContext.Provider>
    </div>
  );
}
