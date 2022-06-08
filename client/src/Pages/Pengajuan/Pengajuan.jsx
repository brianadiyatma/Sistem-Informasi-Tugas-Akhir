import {
  Alert,
  CircularProgress,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Pengajuan = () => {
  const [judul, setJudul] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormChange = (e) => {
    setJudul(e.target.value);
  };

  const { user } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post(
        "/api/user/pengajuan",
        { judul: judul },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        setLoading(false);
        setJudul("");
        setSuccess("Judul Sukses Dikirim !");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <CssBaseline />
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontSize: 40 }}>
            Pengajuan
          </Typography>
          <Typography variant="subtitle1">
            Pengajuan Judul Tugas Akhir
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ marginTop: 4, padding: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">
            Masukkan Judul Tugas Akhir Anda Dalam Form Berikut
          </Typography>
          <TextField
            label="Judul Tugas Akhir"
            variant="outlined"
            margin="normal"
            fullWidth
            value={judul}
            onChange={handleFormChange}
            sx={{ width: "50%" }}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 4 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Pengajuan;
