import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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
}) {
  function handleConfirmModal() {
    onConfirm();
    setModalConfirmed(true);
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
          className="px-4 py-2 border-blue-600 bg-blue-600 hover:bg-blue-800 hover:border-blue-800 duration-300 text-white rounded-md"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmModal}
          className="px-4 py-2 border-red-600 bg-red-600 hover:bg-red-800 hover:border-red-800 duration-300 text-white rounded-md"
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
