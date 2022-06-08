import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

import {
  CircularProgress,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  height: "40%",
  boxShadow: 24,
  p: 4,
};

const ApprovalModal = ({ open, handleClose, fetchData, target }) => {
  console.log(target);
  const [data, setData] = useState({
    adminFeedback: "",
    approval: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("/api/admin/approve-pengajuan", {
        id: target,
        adminFeedback: data.adminFeedback,
        approval: data.approval,
      })
      .then((res) => {
        setLoading(false);
        fetchData();
        handleClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {loading ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <CircularProgress />
          </Container>
        ) : (
          <>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="ID"
              name="id"
              value={target}
              variant="outlined"
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Admin Feedback"
              name="adminFeedback"
              value={data.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
            />
            <Select
              name="approval"
              value={data.approval}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              margin="normal"
              sx={{ marginTop: 2, float: "right" }}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ApprovalModal;
