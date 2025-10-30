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
import { Lock, CloudUpload, CheckCircle, Logout } from "@mui/icons-material";
import { motion } from "framer-motion";

// --- TEMPORARY CONFIGURATION FOR FRONTEND-ONLY LOGIN AND SUBMISSION ---

// 1. REPLACE THIS WITH YOUR ACTUAL GOOGLE FORM LINK
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehoAjL2rIAwcAfjrggQ8kZ1GsfJGB4q7ZH6QWv4JU_eMj8rA/viewform?usp=header";

// 2. HARDCODED TEAM CREDENTIALS (Derived from your list)
// Added a team_id (index + 1) for local state management
const RAW_CREDENTIALS = [
    { leader_name: "Chaithanya S", username: "chaithanya_s", password: "ff42d6cb" },
    { leader_name: "S H BHAVYA", username: "s_h_bhavya", password: "91f84499" },
    { leader_name: "Varshitha HA", username: "varshitha_ha", password: "36a0c73b" },
    { leader_name: "Amulya K S", username: "amulya_k_s", password: "5a7c5af3" },
    { leader_name: "Prajwal. N", username: "prajwal._n", password: "cc38e664" },
    { leader_name: "M R Rutika", username: "m_r_rutika", password: "80172208" },
    { leader_name: "Amulya S", username: "amulya_s", password: "11f0facf" },
    { leader_name: "Nandini JC", username: "nandini_jc", password: "b4236eaf" },
    { leader_name: "LOHITH.N", username: "lohith.n", password: "66c675ab" },
    { leader_name: "Deekshitha K S", username: "deekshitha_k_s", password: "24a34aac" },
    { leader_name: "Chandan M", username: "chandan_m", password: "26cd8423" },
    { leader_name: "Darshan sm", username: "darshan_sm", password: "4381bf53" },
    { leader_name: "Jashwanth.N", username: "jashwanth.n", password: "812e7b08" },
    { leader_name: "Sanjana S", username: "sanjana_s", password: "3b3d619a" },
    { leader_name: "Deepika L Bennur", username: "deepika_l_bennur", password: "dcbe1bd4" },
    { leader_name: "Monika Kumari", username: "monika_kumari", password: "4a1d69a8" },
    { leader_name: "B. C. Geetha", username: "b._c._geetha", password: "2aee1dab" },
    { leader_name: "Nayana R", username: "nayana_r", password: "b67fa035" },
    { leader_name: "R LALITH KUMAR", username: "r_lalith_kumar", password: "66da909b" },
    { leader_name: "Ananya.P", username: "ananya.p", password: "371290fa" },
    { leader_name: "M Nisarga", username: "m_nisarga", password: "720e4ec1" },
    { leader_name: "Manjushree ml", username: "manjushree_ml", password: "08fa754f" },
    { leader_name: "Shreelakshmi M", username: "shreelakshmi_m", password: "6f402bf8" },
    { leader_name: "Navya A", username: "navya_a", password: "71bf567b" },
    { leader_name: "Zakwan", username: "zakwan", password: "1def6f9f" },
    { leader_name: "Ranjana M", username: "ranjana_m", password: "0ca09d73" },
    { leader_name: "Prathiksha.c", username: "prathiksha.c", password: "7e77941d" },
    { leader_name: "Saviyon C C", username: "saviyon_c_c", password: "182dab50" },
    { leader_name: "Sinchana S Gowda", username: "sinchana_s_gowda", password: "af488598" },
    { leader_name: "Yashas Gowda A V", username: "yashas_gowda_a_v", password: "5211a74b" },
    { leader_name: "Pavan K M", username: "pavan_k_m", password: "83651578" },
    { leader_name: "Syntax squad", username: "syntax_squad", password: "41ba5ed9" },
    { leader_name: "Yashaswini sirisha J", username: "yashaswini_sirisha_j", password: "36523418" },
    { leader_name: "Likitha KN", username: "likitha_kn", password: "5c5784a7" },
    { leader_name: "Bhandavya km", username: "bhandavya_km", password: "b126f81c" },
    { leader_name: "Sinchana D M", username: "sinchana_d_m", password: "b4b7e608" },
    { leader_name: "Likith gowda b", username: "likith_gowda_b", password: "f769099d" },
    { leader_name: "Preetham S", username: "preetham_s", password: "1ffdabbd" },
    { leader_name: "Rakesh R Gowda", username: "rakesh_r_gowda", password: "9b3db4e5" },
    { leader_name: "Sanketh C", username: "sanketh_c", password: "3ea2de6d" },
    { leader_name: "Mouna.M", username: "mouna.m", password: "04e8f420" },
    { leader_name: "SUJAN S", username: "sujan_s", password: "1fd9e1bb" },
    { leader_name: "Pramod.g.s", username: "pramod.g.s", password: "912ad84d" },
    { leader_name: "Rabiya basra", username: "rabiya_basra", password: "cc15ff51" },
    { leader_name: "Apoorva", username: "apoorva", password: "63d20428" },
    { leader_name: "Nanda Kishore Raju V", username: "nanda_kishore_raju_v", password: "f8d6ce1e" },
    { leader_name: "Mohana", username: "mohana", password: "2db83ba6" },
    { leader_name: "Ahmed Faraaz", username: "ahmed_faraaz", password: "47c7fa6d" },
    { leader_name: "Bindhusree BM", username: "bindhusree_bm", password: "0e01e0b2" },
    { leader_name: "Amruta P", username: "amruta_p", password: "c174a2dc" },
    { leader_name: "Mohammed ayaan sadiq", username: "mohammed_ayaan_sadiq", password: "05f4d850" },
    { leader_name: "Pranathi.S", username: "pranathi.s", password: "900b9d8f" },
    { leader_name: "AISHWARYA N U", username: "aishwarya_n_u", password: "78d32841" },
    { leader_name: "Bhoomika Gowda", username: "bhoomika_gowda", password: "dfd2c959" },
    { leader_name: "Lakshmi B", username: "lakshmi_b", password: "1dcef7df" },
    { leader_name: "Achuth R", username: "achuth_r", password: "775c95df" },
    { leader_name: "Nigar Sultana", username: "nigar_sultana", password: "da1eeeb0" },
    { leader_name: "Mohammed Sadiq Ahmed", username: "mohammed_sadiq_ahmed", password: "9eae2fe4" },
    { leader_name: "Sy brijesh", username: "sy_brijesh", password: "9a49d968" },
    { leader_name: "Hruthik", username: "hruthik", password: "5153573b" },
    { leader_name: "Manasa.M", username: "manasa.m", password: "94488b31" },
    { leader_name: "MADAN K", username: "madan_k", password: "35f1296b" },
    { leader_name: "Neha B M", username: "neha_b_m", password: "4b274ab5" },
    { leader_name: "Vaishali", username: "vaishali", password: "ae365449" },
    { leader_name: "Poorvika y", username: "poorvika_y", password: "e47f2a30" },
    { leader_name: "Aqsa Begum", username: "aqsa_begum", password: "7c2ede27" },
    { leader_name: "Chandana B M", username: "chandana_b_m", password: "bcd8009b" },
    { leader_name: "Tanuja G V", username: "tanuja_g_v", password: "c5667bf7" },
    { leader_name: "Prajwal gowda AM", username: "prajwal_gowda_am", password: "39962774" },
    { leader_name: "Manju.J", username: "manju.j", password: "31cb7600" },
    { leader_name: "Ibbani A Hiremath", username: "ibbani_a_hiremath", password: "164981e8" },
    { leader_name: "Manoj", username: "manoj", password: "b58c70b1" },
    { leader_name: "Vidyasagar DJ", username: "vidyasagar_dj", password: "e8cf7526" },
    { leader_name: "Ruhan M Mahesh", username: "ruhan_m_mahesh", password: "c9bba43f" },
    { leader_name: "RAVI KUMAR N RAO", username: "ravi_kumar_n_rao", password: "e35495b2" },
    { leader_name: "Chaitanya Shree", username: "chaitanya_shree", password: "1a0bcfb6" },
    { leader_name: "Sanika Y.D", username: "sanika_y.d", password: "0a33f62a" },
    { leader_name: "Sonali.R", username: "sonali.r", password: "acf4981e" },
    { leader_name: "Subramanya bharadhi.v", username: "subramanya_bharadhi.v", password: "ff26d797" },
    { leader_name: "Deeksha. R", username: "deeksha._r", password: "91c7e245" },
    { leader_name: "Kishor", username: "kishor", password: "12a4cee4" },
    { leader_name: "Rishitha d gowda", username: "rishitha_d_gowda", password: "2b70767f" },
    { leader_name: "Vyshnavi", username: "vyshnavi", password: "c3b2eda7" },
    { leader_name: "Tharun gowda s", username: "tharun_gowda_s", password: "d4db07d1" },
    { leader_name: "Vishnu K Das", username: "vishnu_k_das", password: "a1ca8e75" },
    { leader_name: "Navyashree", username: "navyashree", password: "77d82810" },
    { leader_name: "Yashwanth MN", username: "yashwanth_mn", password: "91bb72ae" },
    { leader_name: "Rubaa Khamer", username: "rubaa_khamer", password: "f8194b9a" },
    { leader_name: "Shreya A R", username: "shreya_a_r", password: "fa6b31b2" },
    { leader_name: "Nisarga H", username: "nisarga_h", password: "90925e00" }
].map((team, index) => ({
    ...team,
    team_id: index + 1, // Unique ID for each team
    // Dummy initial state for ppt_path. Set one to a value to test "submitted" state.
    ppt_path: null, 
}));

const DUMMY_API_CALL_TIME = 1000; // Simulate network latency (1 second)

// --- END TEMPORARY CONFIGURATION ---

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
  const [isUploading, setIsUploading] = useState(false);
  
  // Removed unused uploadProgress and API_BASE_URL (not needed for this temporary solution)


  useEffect(() => {
    // Check local storage on mount
    const storedTeam = localStorage.getItem("team");
    if (storedTeam) {
      setTeam(JSON.parse(storedTeam));
    }
  }, []);

  // --- MODIFIED LOGIN HANDLER (FRONTEND ONLY) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Simulate network wait
    await new Promise(resolve => setTimeout(resolve, DUMMY_API_CALL_TIME));

    const foundTeam = RAW_CREDENTIALS.find(
      (cred) => cred.username === username && cred.password === password
    );

    setLoading(false);

    if (foundTeam) {
      // Success: Log the user in
      // Ensure the stored team object doesn't include the password
      const teamData = {
          id: foundTeam.team_id,
          leader_name: foundTeam.leader_name,
          username: foundTeam.username,
          ppt_path: foundTeam.ppt_path,
      }
      setTeam(teamData);
      localStorage.setItem("team", JSON.stringify(teamData));
      setSuccess(`Welcome back, ${foundTeam.leader_name}!`);
      setUsername("");
      setPassword("");
    } else {
      // Failure: Show error
      setError("Login failed. Check your username and password.");
    }
  };

  const handleLogout = () => {
    setTeam(null);
    localStorage.removeItem("team");
    setFile(null);
    setIsUploading(false);
    setSuccess("Logged out successfully.");
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const fileName = uploadedFile.name.toLowerCase();
      // Check for .ppt or .pdf
      if (fileName.endsWith(".ppt") || fileName.endsWith(".pdf")) {
        setFile(uploadedFile);
        setError("");
      } else {
        setError("Please upload a valid .ppt or .pdf file.");
        setFile(null);
      }
    }
  };

  // --- MODIFIED UPLOAD HANDLER (GOOGLE FORM REDIRECT) ---
  const handleUpload = async () => {
    if (!file || !team?.id) {
      setError("Please select a valid PPT or PDF file.");
      return;
    }
    
    // Check if the Google Form URL is set
    if (GOOGLE_FORM_URL === "https://docs.google.com/forms/d/e/1FAIpQLSehoAjL2rIAwcAfjrggQ8kZ1GsfJGB4q7ZH6QWv4JU_eMj8rA/viewform?usp=header") {
        setError("Configuration Error: Please set the actual Google Form link in the code (GOOGLE_FORM_URL variable).");
        return;
    }

    // 1. Simulate Upload (loading state)
    setIsUploading(true);
    setError("");
    setSuccess("");

    // Simulate the time it would take to upload a file (2 seconds)
    await new Promise(resolve => setTimeout(resolve, DUMMY_API_CALL_TIME * 2));

    setIsUploading(false);
    
    // 2. Open Google Form for submission
    // NOTE: We pass the team info to the Google Form URL to help track the submission
    // You would need to configure your Google Form to accept this as pre-filled fields.
    // Replace entry.12345 and entry.67890 with the actual field IDs from your Google Form.
    const teamNameForUrl = team.leader_name.replace(/ /g, '+');
    // const formUrl = `${GOOGLE_FORM_URL}?entry.123456789=${teamNameForUrl}&entry.987654321=${file.name}`;
    
    window.open(GOOGLE_FORM_URL, '_blank');
    
    // 3. Update local state to show "submitted" status
    const updatedTeam = { ...team, ppt_path: `/uploads/${file.name}` }; // Use file name as dummy path
    setTeam(updatedTeam);
    localStorage.setItem("team", JSON.stringify(updatedTeam));
    setFile(null); // Clear the file input

    // 4. Show success message
    setSuccess(`Submission link opened! Please upload your file, **${updatedTeam.leader_name}**, to the Google Form.`);
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
              Please ensure your file is in **.ppt** or **.pdf** format. The last file you submit via the Google Form will be considered your final submission.
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
                **Current Submission Status:** A submission has been recorded locally. You can submit a new file to replace it via the form.
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
              {isUploading ? "Opening Form..." : "Go to Submission Form"}
            </Button>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

            <Button
                variant="outlined"
                onClick={handleLogout}
                startIcon={<Logout />}
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
