import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProfileDetails, patchProfileDetails } from "../../api/apiFunctions";
import { TextField, Button } from "@mui/material";
import styles from "./ProfileForm.module.css";

export function ProfileForm() {
  const { data, isLoading } = useQuery(["profileDetails"], getProfileDetails);
  const queryClient = useQueryClient();

  // State variables for form fields
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    // city: "",
    // address: "",
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.data.name || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        city: data.data.city || "",
        address: data.data.address || "",
      });
    }
  }, [data]);

  const [saved, setSaved] = useState(true);

  const mutation = useMutation(patchProfileDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profileDetails"]);
    },
  });

  const handleSave = () => {
    mutation.mutate(formValues);
    setSaved(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <>
      {!isLoading && (
        <div className={styles.profileForm}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            disabled={saved}
            value={formValues.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: saved ? "gray" : "white" },
              readOnly: saved,
            }}
            InputLabelProps={{
              style: { color: saved ? "gray" : "white" },
            }}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "gray",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
            }}
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            disabled={saved}
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: saved ? "gray" : "white" },
              readOnly: saved,
            }}
            InputLabelProps={{
              style: { color: saved ? "gray" : "white" },
            }}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "gray",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
            }}
          />

          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            disabled={saved}
            value={formValues.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: saved ? "gray" : "white" },
              readOnly: saved,
            }}
            InputLabelProps={{
              style: { color: saved ? "gray" : "white" },
            }}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "gray",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
            }}
          />

          {/* <TextField
            id="city"
            label="City"
            variant="outlined"
            disabled={saved}
            value={formValues.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: saved ? "gray" : "white" },
              readOnly: saved,
            }}
            InputLabelProps={{
              style: { color: saved ? "gray" : "white" },
            }}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "gray",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
            }}
          />

          <TextField
            id="address"
            label="Address"
            variant="outlined"
            disabled={saved}
            value={formValues.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: saved ? "gray" : "white" },
              readOnly: saved,
            }}
            InputLabelProps={{
              style: { color: saved ? "gray" : "white" },
            }}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "gray",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: saved ? "gray" : "white",
              },
            }}
          /> */}

          {saved ? (
            <Button variant="contained" onClick={() => setSaved(false)}>
              Edit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      )}
    </>
  );
}
