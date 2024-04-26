import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import styles from "./SideMenu.module.css";
// eslint-disable-next-line react/prop-types
export default function SideMenu({ toggleDrawer, open }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List onClick={toggleDrawer(false)}>
        <ListItem disablePadding>
          <ListItemButton>
            <HomeIcon
              sx={{ marginInlineEnd: "15px", width: "20px", height: "20px" }}
            />
            <ListItemText
              primary="Home"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "17px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <StoreIcon
              sx={{ marginInlineEnd: "15px", width: "20px", height: "20px" }}
            />
            <ListItemText
              primary="Shop"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "17px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <PersonIcon
              sx={{ marginInlineEnd: "15px", width: "20px", height: "20px" }}
            />
            <ListItemText
              primary="Account"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "17px",
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
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
