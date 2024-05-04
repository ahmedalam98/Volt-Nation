import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./NavBar.module.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getProducts } from "./../../api/apiFunctions";
import { useEffect, useRef, useState } from "react";
function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  //fetch data
  const { data } = useQuery(["products"], getProducts);

  //filter data
  const filteredData = data?.data?.filter((el) =>
    el?.pName?.toLowerCase().includes(searchQuery?.toLowerCase())
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
                        key={el.id}
                        to={`/products/${el.id}`}
                        onClick={handleResultClick}
                      >
                        <div className={styles.result}>{el.pName}</div>
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
            <MobileNavbar data={data?.data} />
            {/* end of mobile navbar */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBar;
