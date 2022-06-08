import {
  Alert,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";

const User = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useSelector((state) => state.auth);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/api/admin/get-user?page=${currentPage - 1}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setData(res.data.users);

        setPageCount(res.data.maxUsers / 20);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const deleteById = (id) => {
    setLoading(true);
    axios
      .post(
        `/api/admin/delete-user`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        fetchData();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const approvebyId = (id) => {
    setLoading(true);
    axios
      .post(
        "/api/admin/activate-user",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        fetchData();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
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
              User Management
            </Typography>
            <Typography variant="subtitle1">Management User</Typography>
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
                    <TableCell align="center">Nama</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Tanggal Registrasi</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((data, i) => (
                    <TableRow hover={true} key={i}>
                      <TableCell align="center">{data._id}</TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.email}</TableCell>
                      <TableCell align="center">{data.date}</TableCell>
                      <TableCell align="center">
                        {data.activation === "pending" && (
                          <Chip label="Pending" color="primary" />
                        )}
                        {data.activation === "activated" && (
                          <Chip label="Approved" color="success" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => deleteById(data._id)}>
                          <DeleteIcon />
                        </IconButton>
                        {!(data.activation === "activated") && (
                          <IconButton onClick={() => approvebyId(data._id)}>
                            <CheckCircleOutlineIcon />
                          </IconButton>
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
    </>
  );
};

export default User;
