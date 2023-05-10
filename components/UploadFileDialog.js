import React from 'react';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_FILE_UPLOAD_DIALOG } from '@/store/types';

export function UploadFileDialog({ handleFileChange, handleFileUpload }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.uiStates.fileUploadDialog);
  const { isOpen } = state;

  const handleClose = () => {
    dispatch({ type: CLOSE_FILE_UPLOAD_DIALOG });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="upload-file-dialog-title"
      aria-describedby="upload-file-dialog-description"
    >
      <DialogTitle id="upload-file-dialog-title">
        Upload JSON configuration file
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="upload-file-dialog-description">
          Upload a previously saved configuration file.
        </DialogContentText>

        <Input type="file" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleFileUpload}>
          Upload
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
