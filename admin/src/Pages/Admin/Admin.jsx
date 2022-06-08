import {
  Alert,
  Button,
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
import ModalAdmin from "../../Component/ModalAdmin/ModalAdmin";
import { useSelector } from "react-redux";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/api/admin/get-admin?page=${currentPage - 1}`, {
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
              Admin Management
            </Typography>
            <Typography variant="subtitle1">Management Admin</Typography>
          </Box>
          <Box>
            <Button onClick={handleOpen}>Add New Admin</Button>
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
                        <Box>
                          <IconButton onClick={() => deleteById(data._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
      <ModalAdmin open={open} handleClose={handleClose} fetchData={fetchData} />
    </>
  );
};

export default Admin;
