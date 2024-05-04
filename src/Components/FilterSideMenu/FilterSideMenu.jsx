import {
  Box,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Slider,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import styles from "./FilterSideMenu.module.css";
export default function FilterSideMenu({
  filters,
  handleChange,
  handleChangePrice,
}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className={styles.filterMenu}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Categories</FormLabel>
          <FormGroup>
            {Object.entries(filters)
              .slice(0, 3)
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
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ margin: "40px 0" }}
        >
          <FormLabel component="legend">Brands</FormLabel>
          <FormGroup>
            {Object.entries(filters)
              .slice(3, -1)
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
            max={10000}
            disableSwap
            sx={{ width: "100%" }}
          />
        </Box>
      </div>
    </Box>
  );
  return (
    <div>
      <button onClick={toggleDrawer(true)} className={styles.filterBtn}>
        <FilterAltIcon /> <span>Filter</span>
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
