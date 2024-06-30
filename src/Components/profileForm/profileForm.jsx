import { useState } from "react";
import { useQueryClient } from "react-query";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./ProfileForm.module.css";

export function ProfileForm({ data }) {
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState({
    data: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
    },
  });

  const [saved, setSaved] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    try {
      const response = await fetch(
        "https://volt-nation.up.railway.app/user/details/edit",
        {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      queryClient.invalidateQueries(["profileDetails"]);
      setSaved(true);
    } catch (error) {
      console.error("Error saving profile details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      data: {
        ...prevValues.data,
        [id]: value,
      },
    }));
  };

  return (
    <>
      <div className={styles.profileForm}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          disabled={saved}
          value={formValues.data.name}
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
          value={formValues.data.email}
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
          value={formValues.data.phone}
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

        {saved ? (
          <div className={styles.profileBtn}>
            <button onClick={() => setSaved(false)}>Edit</button>
          </div>
        ) : (
          <div className={styles.profileBtn}>
            <button onClick={handleSave}>
              {loading ? (
                <CircularProgress
                  size={22}
                  sx={{ color: "var(--color-var3)" }}
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
