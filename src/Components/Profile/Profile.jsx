import React, { useEffect, useState } from "react";
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
  const [pagination, setShowPagination] = useState(true);
  const { data: profileData, isLoading: profileLoading } = useQuery(
    "profileDetails",
    getProfileDetails
  );
  const {
    data: ordersData,
    isLoading: ordersLoading,
    refetch,
  } = useQuery("allOrders", getAllOrders);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowPagination(true);
  };

  // Pagination for orders
  const [ordersPage, setOrdersPage] = useState(1);
  const ordersItemsPerPage = 2;
  const numOrdersPages = Math.ceil(
    ordersData?.data?.length / ordersItemsPerPage
  );

  const handleChangeOrdersPage = (event, value) => {
    setOrdersPage(value);
  };

  const ordersStartIndex = (ordersPage - 1) * ordersItemsPerPage;
  const paginatedOrders = ordersData?.data?.slice(
    ordersStartIndex,
    ordersStartIndex + ordersItemsPerPage
  );

  // Pagination for favorites
  const [favPage, setFavPage] = useState(1);
  const favItemsPerPage = 2;
  const numFavPages = Math.ceil(
    profileData?.data?.favourite?.length / favItemsPerPage
  );

  const handleChangeFavPage = (event, value) => {
    setFavPage(value);
  };

  const favStartIndex = (favPage - 1) * favItemsPerPage;
  const paginatedFavourites = profileData?.data?.favourite?.slice(
    favStartIndex,
    favStartIndex + favItemsPerPage
  );

  useEffect(() => {
    // Reset orders page to 1 when data changes
    setOrdersPage(1);
  }, [ordersData?.data]);

  if (profileLoading || ordersLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {!profileLoading && !ordersLoading && (
        <div className="grid grid-cols-12 sm:px-10 xs:px-5 my-12 md:gap-5 xs:gap-0">
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
              {paginatedOrders.length === 0 && (
                <div className={styles.noPrd}>No orders yet</div>
              )}
              <Orders
                orders={paginatedOrders}
                refetch={refetch}
                setShowPagination={setShowPagination}
              />
              {paginatedOrders.length !== 0 && (
                <div className={styles.pagination}>
                  {pagination && (
                    <Pagination
                      count={numOrdersPages}
                      page={ordersPage}
                      onChange={handleChangeOrdersPage}
                      color="primary"
                      size="large"
                    />
                  )}
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {paginatedFavourites?.length === 0 && (
                <div className={styles.noPrd}>No favorites yet</div>
              )}

              <Orders fav={paginatedFavourites} />
              {paginatedFavourites.length !== 0 && (
                <div className={styles.pagination}>
                  <Pagination
                    count={numFavPages}
                    page={favPage}
                    onChange={handleChangeFavPage}
                    color="primary"
                    size="large"
                  />
                </div>
              )}
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
