import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { CalendarToday, AccessTime, Group, EmojiEvents, Bolt, TrackChanges } from "@mui/icons-material";

export default function HackathonPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(circle at 20% 30%, rgba(0,255,255,0.12) 0%, transparent 25%),
                     radial-gradient(circle at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 25%),
                     radial-gradient(circle at 50% 90%, rgba(0,255,133,0.12) 0%, transparent 20%),
                     #000`,
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
             fontWeight: 900, 
                  background: 'linear-gradient(135deg, #00E5FF, #7C3AED, #00FFC6)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 3,
                  fontSize: { xs: "32px", md: "48px" },
                  letterSpacing: '-0.02em',
                  animation: 'shimmer 4s linear infinite',
                  "@keyframes shimmer": {
                    "0%": { backgroundPosition: '0% center' },
                    "100%": { backgroundPosition: '200% center' }
                  }
            }}
          >
            invISion 2025
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{ color: "rgba(255,255,255,0.7)", mb: 6 }}
          >
            The Ultimate Hackathon Experience
          </Typography>
        </motion.div>

        {/* --- Hackathon Card --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: 5,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(15,15,15,0.8)",
              boxShadow: "0 0 30px rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* --- Left Image --- */}
            <CardMedia
              component="img"
              image="/src/assets/hackathon-poster.jpg"
              alt="Hackathon Poster"
              sx={{
                width: { xs: "100%", md: "40%" },
                height: { xs: 250, md: "auto" },
                objectFit: "cover",
              }}
            />

            {/* --- Right Content --- */}
            <CardContent
              sx={{
                flex: 1,
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontWeight: 700, mb: 2 }}
              >
                Transform Ideas into Reality
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                Join us for 12 hours of innovation, coding, and creativity. Build
                solutions that matter, collaborate with brilliant minds, and
                compete for exciting prizes.
              </Typography>

              {/* --- Info Grid --- */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {[
                  {
                    icon: <CalendarToday sx={{ color: "#00bcd4" }} />,
                    label: "Date",
                    value: "31 Oct 2025",
                  },
                  {
                    icon: <AccessTime sx={{ color: "#ba68c8" }} />,
                    label: "Duration",
                    value: "12 Hours",
                  },
                  {
                    icon: <Group sx={{ color: "#f06292" }} />,
                    label: "Team Size",
                    value: "2–4 Members",
                  },
                  {
                    icon: <EmojiEvents sx={{ color: "#ffca28" }} />,
                    label: "Prize Pool",
                    value: "₹15,000",
                  },
                ].map((item, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box
                      sx={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        p: 2,
                        textAlign: "center",
                        background: "rgba(255,255,255,0.05)",
                        transition: "0.3s",
                        "&:hover": {
                          background: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                        {item.icon}
                      </Box>
                      <Typography variant="body2" sx={{ color: "#bbb" }}>
                        {item.label}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* --- Benefits --- */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <TrackChanges sx={{ color: "#64b5f6" }} />
                  What You’ll Get
                </Typography>
                <Grid container spacing={1}>
                  {[
                    "Mentorship from experts",
                    "Exclusive swag & goodies",
                    "Networking opportunities",
                    "Certificates for all participants",
                  ].map((benefit, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Chip
                        label={benefit}
                        sx={{
                          color: "#fff",
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* --- Buttons --- */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    window.open("https://invision-hackathon-2025.vercel.app/", "_blank")
                  }
                  startIcon={<Bolt />}
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
            }}
                >
                  View Full Details
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    window.open("https://forms.gle/kEdXuAikTwZfEYj", "_blank")
                  }
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
            }}
                >
                  Registeration Closed
                </Button>
              </Box>

              <Typography
                variant="caption"
                align="center"
                sx={{
                  display: "block",
                  color: "rgba(255,255,255,0.5)",
                  mt: 4,
                }}
              >
                Organized by <strong>CodeIS Club</strong>, Department of ISE
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
