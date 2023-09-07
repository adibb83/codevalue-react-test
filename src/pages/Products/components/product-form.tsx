import React, { useContext } from "react";
import { Formik, FormikHelpers, FormikProps, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FormTextField } from "../../../core/helpers/Form-Text-Field";
import { Product, defaultProduct } from "../models/product.model";
import { ProductContext } from "../contexts/product.context";

const ProductForm: React.FC = () => {
  const { saveProduct, updateProduct, currentProduct, setCurrentProduct } = useContext(ProductContext);

  const initialValues: Product = currentProduct;
  const handleSubmit = (
    values: Product,
    formikHelpers: FormikHelpers<Product>
  ) => {
    if (values?.id) {
      updateProduct(values);
    } else {
      saveProduct(values);
      setCurrentProduct(defaultProduct)
      formikHelpers.resetForm({values: currentProduct});
    }
  };

  const CreateProductSchema = Yup.object().shape({
    name: Yup.string().required("Name can't be empty"),
    price: Yup.number()
      .required("price can't be empty")
      .min(1, "Invalid price"),
    description: Yup.string(),
  });

  return (
    <div className="product-form-container">
      <Container maxWidth="md" className="form-container">
      <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        {!!initialValues?.id ? `${initialValues.name} details` : 'Add new product'}
      </Typography>
      </Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={CreateProductSchema}
        >
          {(formikProps: FormikProps<Product>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    label="Name"
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    maxRows={6}
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="price"
                    label="Price"
                    fullWidth
                    component={FormTextField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "1rem" }}
                    disabled={Object.keys(formikProps.errors).length > 0}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default ProductForm;
