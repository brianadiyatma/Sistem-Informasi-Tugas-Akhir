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
import ApprovalModal from "../../Component/ApprovalModal/ApprovalModal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";

const Pengajuan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState("");

  const { user } = useSelector((state) => state.auth);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/api/admin/get-pengajuan?page=${currentPage - 1}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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
  };

  const deleteById = (id) => {
    setLoading(true);
    axios
      .post(
        `/api/admin/delete-pengajuan`,
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              Pengajuan Skripsi
            </Typography>
            <Typography variant="subtitle1">
              Persetujuan Pengajuan Skripsi
            </Typography>
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
                    <TableCell align="center">Persetujuan</TableCell>
                    <TableCell align="center">Tanggal</TableCell>
                    <TableCell align="center">Admin Feedback</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((data, i) => (
                    <TableRow hover={true} key={i}>
                      <TableCell align="center">{data._id}</TableCell>
                      <TableCell align="center">{data.judul}</TableCell>
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
                      <TableCell align="center">{data.Tanggal}</TableCell>
                      <TableCell align="center">{data.adminFeedBack}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => deleteById(data._id)}>
                          <DeleteIcon />
                        </IconButton>
                        {!(data.activation === "activated") && (
                          <IconButton
                            onClick={() => {
                              handleOpen();
                              setTarget(data._id);
                            }}
                          >
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
      <ApprovalModal
        open={open}
        handleClose={handleClose}
        fetchData={fetchData}
        target={target}
      />
    </>
  );
};

export default Pengajuan;
