import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Pagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getProducts } from "../../api/apiFunctions";
import Card from "./../../Components/Card/Card.jsx";
import Slider from "@mui/material/Slider";
import styles from "./Products.module.css";
import FilterSideMenu from "../../Components/FilterSideMenu/FilterSideMenu.jsx";
import { useParams } from "react-router-dom";

const minDistance = 10;

export default function Products() {
  const [filters, setFilters] = useState({
    Apple: false,
    Samsung: false,
    Sony: false,
    LG: false,
    Lenovo: false,
    Dell: false,
    HP: false,
    ASUS: false,
    Alienware: false,
    GIZMOPOWER: false,
    DASEEN: false,
    "1STPLAYER": false,
    price: [0, 0],
  });
  const [page, setPage] = useState(1);
  const { name } = useParams(); // Get the category name from the URL

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("products");
    };
  }, []);

  ////////////fetch data
  const { data, isLoading } = useQuery(["products"], getProducts);
  const selectedCatg = data?.data?.filter((el) => el.category === name);

  //////////control change filters
  const handleChange = (event) => {
    setPage(1);
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  //price
  const handleChangePrice = (event, newValue, activeThumb) => {
    setPage(1);
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFilters({
        ...filters,
        price: [
          Math.min(newValue[0], filters.price[1] - minDistance),
          filters.price[1],
        ],
      });
    } else {
      setFilters({
        ...filters,
        price: [
          filters.price[0],
          Math.max(newValue[1], filters.price[0] + minDistance),
        ],
      });
    }
  };

  ////////////// start handling category and brand filters
  const filteredProducts = selectedCatg?.filter((product) => {
    ///if brand is chosen
    const brandMatch = Object.entries(filters)
      .slice(0, -1)
      .some(([key, value]) => value && product.brand === key);
      
    // If no brands are selected
    const brandFilterApplied = Object.values(filters)
      .slice(0, -1)
      .some((value) => value);

    ///if no filters
    if (!brandFilterApplied) {
      return true;
    }

    return brandMatch;
  });
  ////////////// end handling category and brand filters

  ////////////// start handling price filter based on filters of category and brand
  const priceFilter = filteredProducts?.filter((product) => {
    const priceMatch = Object.entries(filters)
      .slice(-1)
      .some(([key, value]) => {
        const [minPrice, maxPrice] = value;
        const productPrice = Number(product.price);

        return (
          value[1] !== 0 && productPrice >= minPrice && productPrice <= maxPrice
        );
      });

    const priceFilterApplied = Object.values(filters)
      .slice(-1)
      .some((value) => value[1] !== 0);

    ///if no price filter applied
    if (!priceFilterApplied) {
      return filteredProducts;
    }

    return priceMatch;
  });
  ////////////// end handling price filter based on filters of category and brand

  // Pagination
  const itemsPerPage = 12;
  const numPages = Math.ceil(priceFilter?.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = priceFilter?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={`md:px-7 xs:px-5 ${styles.products}`}>
          <div className="xs:flex lg:hidden">
            <FilterSideMenu
              handleChange={handleChange}
              handleChangePrice={handleChangePrice}
              filters={filters}
            />
          </div>
          <div className="grid grid-cols-12 gap-5 px-2">
            <div className="xl:col-span-2 lg:col-span-3 lg:block xs:hidden ">
              {/* categories */}
              <div className={styles.filters}>
                <FormControl
                  component="fieldset"
                  variant="standard"
                  sx={{ marginBottom: "40px" }}
                >
                  <FormLabel component="legend">Brands</FormLabel>
                  <FormGroup>
                    {Object.entries(filters)
                      .slice(0, -1)
                      .map(([key, value]) => (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              checked={value}
                              onChange={handleChange}
                              name={key}
                            />
                          }
                          label={key}
                        />
                      ))}
                  </FormGroup>
                </FormControl>
                <Box>
                  <label>Price</label>
                  <Slider
                    getAriaLabel={() => "Minimum distance"}
                    value={filters.price}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    min={100}
                    max={1500}
                    disableSwap
                    sx={{ width: "100%" }}
                  />
                </Box>
              </div>
            </div>

            <div className="xl:col-span-10 lg:col-span-9 xs:col-span-12">
              {paginatedProducts.length === 0 ? (
                <div className={styles.noProducts}>
                  <div>No products found</div>
                </div>
              ) : (
                <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                  {paginatedProducts?.map((el) => (
                    <Card key={el.id} product={el} />
                  ))}
                </div>
              )}
              <Pagination
                count={numPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                size="large"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
