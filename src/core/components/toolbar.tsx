import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProductContext } from "../../pages/Products/contexts/product.context";
import { defaultProduct } from "../../pages/Products/models/product.model";
import {
  ProductSortOptions,
  SortOptionsModle,
} from "../models/productFilter.model";

import { ToolBarFilterContext } from "../contexts/toolbarFilter.context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledSelectBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    border: `solid 1px ${alpha(theme.palette.common.white, 0.15)}`,
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    width: "80%",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    border: `solid 1px ${alpha(theme.palette.common.white, 0.15)}`,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "80%",
  },
}));

export default function SearchAppBar() {
  const { setCurrentProduct } = useContext(ProductContext);
  const { setSort, eventSort , setQuery} = useContext(ToolBarFilterContext);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentProduct(defaultProduct);
            }}
          >
            Add Product
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </Search>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              variant={"outlined"}
              labelId="sort-label"
              id="sort-small"
              value={eventSort}
              label="Sort By"
              onChange={handleChange}
              input={<StyledSelectBase />}
            >
              {ProductSortOptions.map((item: SortOptionsModle) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
