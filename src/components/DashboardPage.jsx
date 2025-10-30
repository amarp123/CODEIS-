// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { Lock, CloudUpload, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

// Assuming your backend runs on port 5000 as per the .env file
const API_BASE_URL = "http://localhost:5000/api";

export default function DashboardPage() {
  const [team, setTeam] = useState(
    JSON.parse(localStorage.getItem("team")) || null
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const storedTeam = localStorage.getItem("team");
    if (storedTeam) {
      setTeam(JSON.parse(storedTeam));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.ok) {
        setTeam(data.team);
        localStorage.setItem("team", JSON.stringify(data.team));
        setSuccess(`Welcome back, ${data.team.leader_name}!`);
        setUsername("");
        setPassword("");
      } else {
        setError(data.msg || "Login failed. Check your credentials.");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error. Could not connect to the server.");
    }
  };

  const handleLogout = () => {
    setTeam(null);
    localStorage.removeItem("team");
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setSuccess("Logged out successfully.");
  };

  // --- UPDATED: To accept both .ppt and .pdf files ---
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
        const fileName = uploadedFile.name.toLowerCase();
        // Check if the file name ends with '.ppt' OR '.pdf'
        if (fileName.endsWith(".ppt") || fileName.endsWith(".pdf")) {
            setFile(uploadedFile);
            setError("");
        } else {
            setError("Please upload a valid .ppt or .pdf file.");
            setFile(null);
        }
    }
  };

  const handleUpload = async () => {
    // Adjusted error message to reflect both acceptable files
    if (!file || !team?.id) {
      setError("Please select a valid PPT or PDF file.");
      return;
    }

    const formData = new FormData();
    // Since the server side will need to handle both PPT and PDF, 
    // it's best to keep the FormData key generic, though 'ppt' is used here.
    // It is recommended to use a more generic key like 'file' if the backend is flexible.
    formData.append("ppt", file); 

    setIsUploading(true);
    setUploadProgress(0);
    setError("");
    setSuccess("");

    try {
      // NOTE: For real-time progress, you'd typically use an XHR request
      // This fetch call is a simplified version for demonstration
      const response = await fetch(`${API_BASE_URL}/upload/${team.id}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setIsUploading(false);

      if (data.ok) {
        // Update local state and local storage with the new ppt_path
        const updatedTeam = { ...team, ppt_path: data.pptPath };
        setTeam(updatedTeam);
        localStorage.setItem("team", JSON.stringify(updatedTeam));
        setSuccess("File uploaded successfully! Submitting a new file will overwrite the old one.");
        setFile(null); // Clear the file input
      } else {
        setError(data.msg || "Upload failed. Please try again.");
      }
    } catch (err) {
      setIsUploading(false);
      setError("Network error. Could not upload the file.");
    }
  };


  const commonBoxStyle = {
    minHeight: "100vh",
    position: "relative",
    background: `radial-gradient(circle at 20% 30%, rgba(0,255,255,0.12) 0%, transparent 25%),
                 radial-gradient(circle at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 25%),
                 radial-gradient(circle at 50% 90%, rgba(0,255,133,0.12) 0%, transparent 20%),
                 #000`,
    pt: { xs: 10, md: 14 },
    pb: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // --- RENDERING LOGIN FORM OR DASHBOARD ---

  if (!team) {
    // --- Login Form ---
    return (
      <Box sx={commonBoxStyle}>
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Paper
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 5,
                background: "rgba(15,15,15,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 40px rgba(124,58,237,0.1)",
              }}
            >
              <Box textAlign="center" mb={4}>
                <Lock sx={{ fontSize: 40, color: "#00FFC6", mb: 1 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 0 10px rgba(0,255,198,0.25)",
                  }}
                >
                  Team Login
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}>
                  Use the credentials provided to your Team Leader.
                </Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  required
                  sx={{ input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.7)" }, 
                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(0,255,198,0.3)" }, "&:hover fieldset": { borderColor: "#00FFC6" } } }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                  sx={{ input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.7)" }, 
                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(0,255,198,0.3)" }, "&:hover fieldset": { borderColor: "#00FFC6" } } }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: 16,
                    borderRadius: "999px",
                    background: "linear-gradient(90deg,#00FFC6,#7C3AED)",
                    boxShadow: "0 0 20px rgba(0,255,198,0.45)",
                    "&:hover": { filter: "brightness(1.12)" },
                  }}
                >
                  {loading ? "Logging In..." : "Log In"}
                </Button>
              </form>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  // --- Dashboard with File Upload ---
  return (
    <Box sx={commonBoxStyle}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 5,
              background: "rgba(15,15,15,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 40px rgba(0,255,255,0.1)",
              color: "#fff",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                background: "linear-gradient(90deg, #00FFC6, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Welcome, {team.leader_name}!
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}>
              Your Team Dashboard - invISion 2025
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4, lineHeight: 1.7 }}>
              This is where you'll submit your final presentation for the Hackathon.
              Please ensure your file is in **.ppt** or **.pdf** format. The last file you upload will be considered your final submission.
            </Typography>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* --- File Upload Section --- */}
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#00FFC6", mb: 2 }}>
              Final File Submission (.ppt or .pdf)
            </Typography>

            <Box mb={3}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                disabled={isUploading}
                sx={{
                  mr: 2,
                  py: 1,
                  px: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#00FFC6",
                  borderColor: "#00FFC6",
                  "&:hover": {
                    backgroundColor: "rgba(0,255,198,0.1)",
                    borderColor: "#00FFC6",
                  },
                }}
              >
                {file ? "Change File" : "Select File"}
                {/* UPDATED: accept=".ppt,.pdf" to allow both types */}
                <input type="file" accept=".ppt,.pdf" hidden onChange={handleFileUpload} />
              </Button>

              {file && (
                <Typography variant="body1" component="span" sx={{ color: "rgba(255,255,255,0.9)" }}>
                  **Selected:** {file.name}
                </Typography>
              )}
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {team.ppt_path ? (
              <Alert icon={<CheckCircle fontSize="inherit" />} severity="info" sx={{ mb: 3, backgroundColor: 'rgba(0,255,198,0.1)', color: '#00FFC6' }}>
                **Current Submission:** A file is already submitted. You can upload a new one to replace it.
              </Alert>
            ) : (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    No presentation has been submitted yet.
                </Alert>
            )}


            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!file || isUploading}
              endIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{
                py: 1.5,
                px: 5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 16,
                borderRadius: "999px",
                background: "linear-gradient(90deg,#00FFC6,#7C3AED)",
                boxShadow: "0 0 20px rgba(0,255,198,0.45)",
                "&:hover": { filter: "brightness(1.12)" },
                transition: "0.3s",
              }}
            >
              {isUploading ? "Uploading..." : "Submit Final File"}
            </Button>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

            <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                    color: '#7C3AED',
                    borderColor: '#7C3AED',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(124,58,237,0.1)'
                    }
                }}
            >
                Log Out
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}