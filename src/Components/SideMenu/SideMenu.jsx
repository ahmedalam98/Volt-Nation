/* eslint-disable react/prop-types */
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";

export default function SideMenu({ toggleDrawer, open }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List onClick={toggleDrawer(false)}>
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
              primary="Shop"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "17px",
                  color: "white",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
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
        </ListItem>
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
