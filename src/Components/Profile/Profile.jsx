import React, { useState } from "react";
import Box from "@mui/material/Box";

import styles from "./Profile.module.css";
import { useQuery } from "react-query";
import {
  getAllOrders,
  getProducts,
  getProfileDetails,
} from "../../api/apiFunctions";
import Orders from "./Orders.jsx";
import { ProfileForm } from "../profileForm/profileForm.jsx";
import { Pagination, Tab, Tabs } from "@mui/material";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Profile() {
  const [value, setValue] = useState(0);
  const { data: profileData, isLoading: profileLoading } = useQuery(
    "profileDetails",
    getProfileDetails
  );
  const { data: ordersData, isLoading: ordersLoading } = useQuery(
    "allOrders",
    getAllOrders
  );

  console.log(ordersData?.data, "oo");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [page, setPage] = useState(1);

  // Pagination
  const itemsPerPage = 2;
  const numPages = Math.ceil(ordersData?.data?.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = ordersData?.data?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      {!profileLoading && !ordersLoading && (
        <div className="grid grid-cols-12 sm:px-10 xs:px-2 my-12 md:gap-5 xs:gap-7">
          {/* <div className="col-span-8">
         
          <div className="mr-16">
            {orders ? (
              <Orders products={orderProducts} trackOrder="TrackOrder" />
            ) : (
              ""
            )}
            {wishlist ? (
              <Orders products={wishlistProducts} addToCard="Add to cart" />
            ) : (
              ""
            )}
          </div>
        </div> */}
          <div className={`${styles.orders} md:col-span-8 xs:col-span-12`}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                paddingBottom: "20px ",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{
                  style: { backgroundColor: "var(--color-var1)" },
                }}
                sx={{
                  "& .MuiTab-root": {
                    color: "white",
                    "&.Mui-selected": {
                      color: "var(--color-var1)",
                    },
                  },
                }}
              >
                <Tab label="Orders" {...a11yProps(0)} />
                <Tab label="Wishlist" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {paginatedProducts?.map((el) => (
                <Orders key={el._id} order={el} />
              ))}
              <div className={styles.pagination}>
                <Pagination
                  count={numPages}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  size="large"
                />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
          </div>
          <div className="md:col-span-4 xs:col-span-12">
            <ProfileForm data={profileData?.data} />
          </div>{" "}
        </div>
      )}
    </div>
  );
}
