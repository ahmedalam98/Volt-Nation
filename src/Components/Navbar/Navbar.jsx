import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

// cart
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Avatar,
  Badge,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import styles from "./NavBar.module.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getProducts } from "./../../api/apiFunctions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../Store/cartSlice.js";
import { Logout } from "@mui/icons-material";
import { logout } from "../../Store/authSlice.js";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchContainerRef = useRef(null);
  const queryClient = useQueryClient();

  // start of Checking logged in
  let decodedToken;
  let Token = localStorage.getItem("token");
  let valid = false;

  if (Token) {
    decodedToken = jwtDecode(Token);
    let expirationTime = decodedToken.exp;
    let currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < expirationTime) {
      valid = true;
    }
  }
  // end of Checking logged in

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/");
  };

  // fetch cart
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const products = useSelector((state) => state.cart.products);

  //fetch data
  const { data } = useQuery(["products"], getProducts);

  //filter data
  const filteredData = data?.data?.filter((el) =>
    el?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  //handle open and close of search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchQuery("");
        setShowResults(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value !== "");
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
  };
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };
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
                  value={searchQuery}
                  id="search"
                  ref={searchContainerRef}
                  placeholder="Search"
                  className={styles.search}
                  onChange={handleSearchChange}
                  onBlur={handleInputBlur}
                />
                {showResults && (
                  <div className={styles.resContainer}>
                    {filteredData.length === 0 && (
                      <div className={styles.noProducts}>No Products Found</div>
                    )}
                    {filteredData?.map((el) => (
                      <Link
                        key={el._id}
                        to={`/products/${el._id}`}
                        onClick={handleResultClick}
                      >
                        <div className={styles.result}>{el.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
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
                  onClick={() => navigate("/categories")}
                >
                  Categories
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
                  Profile
                </Button>
                <label htmlFor="search" className={styles.label}>
                  <SearchIcon sx={{ width: "30px", height: "30px" }} />
                </label>
              </div>
            </Box>
            {valid ? (
              <Box
                sx={{
                  flexGrow: 0,
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Badge
                  badgeContent={
                    products?.reduce(
                      (acc, cur) => acc + Number(cur.quantity),
                      0
                    ) || "0"
                  }
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
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, marginInlineStart: "35px" }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {decodedToken?.email?.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
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
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  color: "var(--color-var5)",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  backgroundColor: "var(--color-var3)",
                  border: "1px solid var(--color-var1)",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "var(--color-var3)",
                    borderTop: "1px solid var(--color-var1)",
                    borderLeft: "1px solid var(--color-var1)",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout
                    fontSize="small"
                    sx={{
                      color: "var(--color-var5)",
                    }}
                  />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            {/* start of mobile navbar */}
            <MobileNavbar data={data?.data} />
            {/* end of mobile navbar */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBar;
