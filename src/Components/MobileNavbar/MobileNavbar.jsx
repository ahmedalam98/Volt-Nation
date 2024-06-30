import {
  Box,
  Button,
  Input,
  InputAdornment,
  Modal,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SideMenu from "../SideMenu/SideMenu.jsx";
import styles from "./MobileNavbar.module.css";
import { Link } from "react-router-dom";

export default function MobileNavbar({ data }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchQueryMob, setSearchQueryMob] = useState("");

  const filteredData = data?.filter((el) =>
    el?.name?.toLowerCase().includes(searchQueryMob?.toLowerCase())
  );

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleResultClick = () => {
    setSearchQueryMob("");
    setOpenModal(false);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <>
      {/*****  Side menu *****/}

      <Button
        onClick={toggleDrawer(true)}
        sx={{
          display: {
            xs: "flex",
            md: "none",
            flex: 1,
            justifyContent: "flex-start",
          },
        }}
      >
        <MenuIcon
          sx={{
            width: "25px",
            height: "25px",
            color: "var(--color-var1)",
          }}
        />
      </Button>

      <SideMenu toggleDrawer={toggleDrawer} open={open}></SideMenu>
      {/*****  Side menu *****/}

      <Typography
        variant="h6"
        component="div"
        sx={{
          flex: 1,
          fontWeight: 700,
          fontSize: { xs: "20px", md: "30px" },
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
        }}
      >
        <Link to="/">VoltNation</Link>
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-end",
        }}
        onClick={handleOpenModal}
      >
        <SearchIcon sx={{ width: "25px", height: "25px" }} />
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            backgroundColor: "var(--color-var3)",
            border: "1px solid var(--color-var1)",
            borderRadius: "5px",
            boxShadow: 24,
            padding: "25px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Input
              id="input-with-icon-adornment"
              value={searchQueryMob}
              onChange={(e) => setSearchQueryMob(e.target.value)}
              sx={{
                borderBottom: "1px solid var(--color-var1)",
                width: "100%",
                color: "var(--color-var5)",
                fontSize: "16px",
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      width: "25px",
                      height: "25px",
                      color: "var(--color-var1)",
                    }}
                  />
                </InputAdornment>
              }
            />
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{
              mt: 2,
              color: "var(--color-var5)",
              fontSize: "16px",
              height: "200px",
              overflowY: "scroll",
            }}
          >
            {filteredData?.length === 0 ||
              (searchQueryMob === "" && (
                <div className={styles.noProducts}>No products found</div>
              ))}
            {filteredData?.length !== 0 &&
              searchQueryMob !== "" &&
              filteredData?.map((el) => (
                <Link
                  key={el._id}
                  to={`/products/${el._id}`}
                  onClick={handleResultClick}
                >
                  <div className={styles.result} key={el.id}>
                    {el.name}
                  </div>
                </Link>
              ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
