import React, { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Typography,
  Toolbar,
  Box,
  styled,
  MenuItem,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createTheme,
  CssBaseline,
  Switch,
} from "@mui/material";
import { Avatar } from "@mui/material";
import {
  AccountBox,
  DarkMode,
  Dashboard,
  DoorBack,
  Inventory,
  LightMode,
  Person,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/system";

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginRight: "10px",
}));

const Navbar = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#4F826F",
          },
          secondary: {
            main: "#000000",
          },
          success: {
            main: "#e6e6e6",
            light: "#F2F2F0",
            dark: "#040404",
          },
          error: {
            main: "#000000",
          },
        },
      }),
    [mode]
  );
  const CustomLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: mode === "light" ? "black" : "white",
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* START OF TOP NAVBAR */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => setOpenSideBar(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Sistem Informasi Tugas Akhir
                </Typography>
              </Box>
              <UserBox>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <Avatar sx={{ width: 30, height: 30 }} />
                </IconButton>
                <Typography>Brian</Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem sx={{ gap: 2 }}>
                    <Person />
                    <Typography>Profile</Typography>
                  </MenuItem>
                  <MenuItem sx={{ gap: 2 }}>
                    <DoorBack />
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </UserBox>
            </Toolbar>
          </AppBar>
          {/* END OF TOP NAVBAR */}
          {/* START OF SIDEBAR */}
          <SwipeableDrawer
            anchor="left"
            open={openSideBar}
            onClose={() => setOpenSideBar(false)}
            onOpen={() => setOpenSideBar(true)}
          >
            <Box role="presentation" sx={{ width: 250 }}>
              <List>
                <CustomLink to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </CustomLink>
                <CustomLink to="/inventaris">
                  <ListItem button>
                    <ListItemIcon>
                      <Inventory />
                    </ListItemIcon>
                    <ListItemText primary="Pengajuan" />
                  </ListItem>
                </CustomLink>
                <CustomLink to="/account">
                  <ListItem button>
                    <ListItemIcon>
                      <AccountBox />
                    </ListItemIcon>
                    <ListItemText primary="Repository" />
                  </ListItem>
                </CustomLink>
                <ListItem
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  button
                >
                  <DarkMode />

                  <Switch
                    checked={mode === "light"}
                    onChange={(e) =>
                      setMode(mode === "light" ? "dark" : "light")
                    }
                  />
                  <LightMode sx={{ color: "#EA9300" }} />
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>
          {/* END OF SIDEBAR */}
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
