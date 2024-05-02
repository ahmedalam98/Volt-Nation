import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchProduct = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    // To clear the timeout & prevent redundant or rapid updates. If the component re-renders before the timeout,
    return () => clearTimeout(timeout);
  });

  return (
    <div className="w-[500px] md:w-[800px] flex items-center gap-2">
      <SearchIcon />

      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchProduct;
