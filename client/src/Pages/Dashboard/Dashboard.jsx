import {
  Alert,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // const { user } = useSelector((state) => state.auth);
  const user = {
    token: "ABC",
  };

  console.error("Unhandled Error : you are dumb");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/user/pengajuan?page=${currentPage - 1}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setData(res.data.pengajuan);

        setPageCount(res.data.maxPengajuan / 20);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [currentPage]);

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
            Dashboard
          </Typography>
          <Typography variant="subtitle1">Dashboard Tugas Akhir</Typography>
        </Box>
      </Paper>

      <Paper sx={{ marginTop: 2, padding: 2 }}>
        {loading && (
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
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {data && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={50}>
                    ID
                  </TableCell>
                  <TableCell align="center">Judul</TableCell>
                  <TableCell align="center">Tanggal</TableCell>
                  <TableCell align="center">Persetujuan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, i) => (
                  <TableRow hover={true} key={i}>
                    <TableCell align="center">{data._id}</TableCell>
                    <TableCell align="center">{data.judul}</TableCell>
                    <TableCell align="center">{data.Tanggal}</TableCell>
                    <TableCell align="center">
                      {data.persetujuan === "pending" && (
                        <Chip label="Pending" color="primary" />
                      )}
                      {data.persetujuan === "approved" && (
                        <Chip label="Approved" color="success" />
                      )}
                      {data.persetujuan === "rejected" && (
                        <Chip label="Rejected" color="error" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      >
        <Pagination
          count={Math.ceil(pageCount)}
          value={currentPage}
          defaultValue={currentPage}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
        />
      </Container>
    </Container>
  );
};

export default Dashboard;
