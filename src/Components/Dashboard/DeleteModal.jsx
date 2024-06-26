import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useQueryClient } from "react-query";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteModal({
  open,
  onClose,
  onConfirm,
  setModalConfirmed,
  title,
  description,
  productId,
}) {
  const queryClient = useQueryClient();

  async function handleConfirmModal() {
    try {
      console.log("Deleting product with id:", productId);
      const response = await fetch(
        `https://volt-nation.up.railway.app/products/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      await queryClient.invalidateQueries("products");
      await queryClient.invalidateQueries("categories");
      await queryClient.invalidateQueries("statistics");
      onConfirm();
      setModalConfirmed(true);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <button
          onClick={onClose}
          className="px-4 py-2 border-blue-500 bg-blue-500 hover:bg-blue-700 hover:border-blue-700 duration-300 text-white rounded-md"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmModal}
          className="px-4 py-2 border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 duration-300 text-white rounded-md"
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
