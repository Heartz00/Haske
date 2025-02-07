import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Ensure correct Firebase setup
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

// Define menu items for the admin sidebar
const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Manage Users", path: "/admin/users" },
  { name: "Analytics", path: "/admin/analytics" },
  { name: "Settings", path: "/admin/settings" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(menuItems[0].path);
  const [isAdmin, setIsAdmin] = useState(null); // Null means loading
  const [timer, setTimer] = useState(null); // Timer to track inactivity

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `https://haske.online:8080/api/verification/check-verification?email=${user.email}`
        );
        const data = await response.json();
        if (data.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      }
    };

    checkAdminStatus();
    const handleInactivity = () => {
      setTimer(setTimeout(() => {
        handleSignOut();
      }, 5 * 60 * 1000)); // 5 minutes
    };

    // Reset the timer on any user interaction (mousemove, keydown, click, scroll)
    const resetInactivityTimer = () => {
      if (timer) clearTimeout(timer); // Clear the previous timeout
      handleInactivity(); // Start a new timer
    };

    // Add event listeners for inactivity detection
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);
    window.addEventListener("scroll", resetInactivityTimer);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
      window.removeEventListener("scroll", resetInactivityTimer);
      if (timer) clearTimeout(timer); // Clear timeout on cleanup
    };
  }, [navigate, timer]);
  
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/", { state: { message: "Signed out successfully!" } });
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  // Show loader while verifying admin status
  if (isAdmin === null) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <List>
          <ListItem button onClick={() => navigate("/patient-details")}>
            <ListItemText primary="Haske" />
          </ListItem>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.name}
              selected={selected === item.path}
              onClick={() => {
                setSelected(item.path);
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem button onClick={handleSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Admin Panel</Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
