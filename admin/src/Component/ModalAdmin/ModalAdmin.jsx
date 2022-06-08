import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import {
  Alert,
  CircularProgress,
  Container,
  TextField,
  Typography,
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

const ModalAdmin = ({ open, handleClose, fetchData }) => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("/api/admin/add-admin", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        fetchData();
        handleClose();
        setData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={style}>
        {error && <Alert severity="error">{error}</Alert>}
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
            <TextField
              label="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
                sx={{ float: "right", marginTop: 2 }}
              >
                Submit
              </Button>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalAdmin;
