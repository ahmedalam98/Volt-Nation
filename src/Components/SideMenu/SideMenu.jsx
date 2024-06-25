import {
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./SideMenu.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../Store/cartSlice";
import { Link } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import { jwtDecode } from "jwt-decode";

export default function SideMenu({ toggleDrawer, open }) {
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
  // end of Checking logged in  // fetch cart
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const products = useSelector((state) => state.cart.products);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List onClick={toggleDrawer(false)}>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <HomeIcon
                sx={{
                  marginInlineEnd: "15px",
                  width: "20px",
                  height: "20px",
                  color: "white",
                }}
              />
              <ListItemText
                primary="Home"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "17px",
                    color: "white",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/categories">
          <ListItem disablePadding>
            <ListItemButton>
              <StoreIcon
                sx={{
                  marginInlineEnd: "15px",
                  width: "20px",
                  height: "20px",
                  color: "white",
                }}
              />
              <ListItemText
                primary="Categories"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "17px",
                    color: "white",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {valid ? (
          <>
            <Link to="/cart">
              <ListItem disablePadding>
                <ListItemButton>
                  <Badge
                    badgeContent={
                      products?.reduce(
                        (acc, cur) => acc + Number(cur.quantity),
                        0
                      ) || "0"
                    }
                    className={`${styles.cartMob} cursor-pointer `}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{
                        marginInlineEnd: "15px",
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                  </Badge>
                  <ListItemText
                    primary="Cart"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "17px",
                        color: "white",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>{" "}
            </Link>
            <Link to="/profile">
              <ListItem disablePadding>
                <ListItemButton>
                  <PersonIcon
                    sx={{
                      marginInlineEnd: "15px",
                      width: "20px",
                      height: "20px",
                      color: "white",
                    }}
                  />
                  <ListItemText
                    primary="Account"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "17px",
                        color: "white",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>{" "}
            </Link>
            <ListItem disablePadding onClick={() => dispatch(logout())}>
              <ListItemButton>
                <LogoutIcon
                  sx={{
                    marginInlineEnd: "15px",
                    width: "20px",
                    height: "20px",
                    color: "white",
                  }}
                />
                <ListItemText
                  primary="Log out"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "17px",
                      color: "white",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <Link to="/login">
              <ListItem disablePadding>
                <ListItemButton>
                  <LockOpenIcon
                    sx={{
                      marginInlineEnd: "15px",
                      width: "20px",
                      height: "20px",
                      color: "white",
                    }}
                  />
                  <ListItemText
                    primary="Login"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "17px",
                        color: "white",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/sign-up">
              <ListItem disablePadding>
                <ListItemButton>
                  <VpnKeyIcon
                    sx={{
                      marginInlineEnd: "15px",
                      width: "20px",
                      height: "20px",
                      color: "white",
                    }}
                  />
                  <ListItemText
                    primary="Sign Up"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "17px",
                        color: "white",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  );
  return (
    <>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            maxWidth: "100%",
            backgroundColor: "var(--color-var3)",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
