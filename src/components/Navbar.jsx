// src/components/Navbar.jsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "About", path: "/about" },
    { label: "Hackathons", path: "/hackathons" },
    { label: "Club Gallery", path: "/gallery" },
    { label: "Team", path: "/team" },
    { label: "Announcements", path: "/dashboard" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background: "rgba(0,0,0,0.9)",
        color: "#E5E7EB",
        p: 2,
      }}
      onClick={handleDrawerToggle}
    >
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 22,
          mb: 2,
          background: "linear-gradient(135deg, #00E5FF, #7C3AED, #00FFC6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        CodeIS
      </Typography>

      <List>
        {navItems.map((item, i) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  color: active ? "#00FFC6" : "#E5E7EB",
                  background: active ? "rgba(0,255,198,0.15)" : "transparent",
                  "&:hover": { background: "rgba(0,255,198,0.12)" },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Button
        fullWidth
        variant="contained"
        href="https://docs.google.com/forms/YOUR_FORM_LINK"
        target="_blank"
        sx={{
          mt: 2,
          fontWeight: 700,
          borderRadius: "999px",
          background: "linear-gradient(90deg,#00FFC6,#7C3AED)",
          boxShadow: "0 0 20px rgba(0,255,198,0.45)",
          "&:hover": { filter: "brightness(1.12)" },
        }}
      >
        Join Club
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 16,
          left: 0,
          right: 0,
          mx: "auto",
          width: "88%",
          borderRadius: "18px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(0,255,255,0.10)",
          boxShadow: "0 0 40px rgba(0,255,255,0.10)",
          transition: "0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 1.1 }}>
          {/* ✅ Logo */}
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: 0.2,
              background: "linear-gradient(135deg, #00E5FF, #7C3AED, #00FFC6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(0,255,198,0.25)",
            }}
          >
            CodeIS
          </Typography>

          {/* ✅ Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item, i) => {
              const active = location.pathname === item.path;
              return (
                <Button
                  key={i}
                  component={Link}
                  to={item.path}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 15,
                    color: active ? "#00FFC6" : "#E5E7EB",
                    background: active ? "rgba(0,255,198,0.15)" : "transparent",
                    borderRadius: "12px",
                    px: 1.8,
                    transition: "0.25s",
                    "&:hover": {
                      color: "#00FFC6",
                      background: "rgba(0,255,198,0.12)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* ✅ Mobile Menu Icon + Join Button */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton
              sx={{ display: { md: "none" }, color: "#00FFC6" }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Button
              variant="contained"
              href="https://docs.google.com/forms/YOUR_FORM_LINK"
              target="_blank"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "999px",
                px: 3,
                py: 0.9,
                fontSize: 14,
                background: "linear-gradient(90deg,#00FFC6,#7C3AED)",
                boxShadow: "0 0 20px rgba(0,255,198,0.45)",
                "&:hover": { filter: "brightness(1.12)" },
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              Join Club
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
