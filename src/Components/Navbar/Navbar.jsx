import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

// cart
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Menu, MenuItem } from "@mui/material";

import styles from "./NavBar.module.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function NavBar() {
  const [badge, setBadge] = useState(5);

  const navigate = useNavigate();
  return (
    <div className={styles.navContainer}>
      <AppBar position="static" sx={{ background: "transparent" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="a"
              sx={{
                flex: 1,
                fontWeight: 700,
                fontSize: { xs: "20px", md: "30px" },
                display: { xs: "none", md: "flex" },
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              VoltNation
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flex: 2,
                justifyContent: "center",
              }}
            >
              <div className={styles.tabs}>
                <input
                  // type="search"
                  id="search"
                  placeholder="Search"
                  className={styles.search}
                />
                <Button
                  className={`${styles.customBtn} ${styles.home}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 15px",
                    padding: "10px",
                  }}
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button
                  className={`${styles.customBtn} ${styles.products}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 15px",
                    padding: "10px",
                  }}
                  onClick={() => navigate("/products")}
                >
                  Products
                </Button>
                <Button
                  className={`${styles.customBtn} ${styles.account}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 15px",
                    padding: "10px",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Account
                </Button>
                <label htmlFor="search" className={styles.label}>
                  <SearchIcon sx={{ width: "30px", height: "30px" }} />
                </label>
              </div>
            </Box>
            {/* cart */}
            <Badge
              badgeContent={badge ? badge : "0"}
              className={`${styles.cart} cursor-pointer `}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                }}
              />
            </Badge>

            <Box
              sx={{
                flexGrow: 0,
                flex: 1,
                justifyContent: "flex-end",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Button
                className={styles.authBtn}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                className={styles.authBtn}
                onClick={() => navigate("/sign-up")}
              >
                Register
              </Button>
            </Box>

            {/* start of mobile navbar */}
            <MobileNavbar />
            {/* end of mobile navbar */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBar;
