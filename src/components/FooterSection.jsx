import React from "react";
import { Box, Container, Typography, Link, Grid, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from '@mui/icons-material/X'; // Using XIcon for Twitter/X
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

// Define the gradient colors for consistency
const CODEIS_GRADIENT = 'linear-gradient(135deg, #00E5FF, #7C3AED, #00FFC6)';
const CODEIS_NEON_BLUE = '#00E5FF';
const CODEIS_NEON_GREEN = '#00FFC6';

const socialLinks = [
  { icon: <GitHubIcon />, href: "#", label: "GitHub" },
  { icon: <XIcon />, href: "#", label: "X (Twitter)" },
  { icon: <LinkedInIcon />, href: "#", label: "LinkedIn" },
  { icon: <EmailIcon />, href: "mailto:contact@codeis.com", label: "Email" },
];

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2
    }
  }
};

export default function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        position: "relative",
        // Inherit the dark background but make it slightly less complex than the about section
        background: `
          radial-gradient(circle at 10% 90%, rgba(124,58,237,0.1), transparent 50%),
          radial-gradient(circle at 90% 10%, rgba(0,255,198,0.1), transparent 50%),
          #000`,
        borderTop: "1px solid rgba(0,255,255,0.1)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
            
            {/* Logo/Identity and Slogan */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  background: CODEIS_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1,
                  fontSize: { xs: "24px", md: "28px" },
                  letterSpacing: '-0.02em',
                }}
              >
                CODEIS
              </Typography>
              <Typography sx={{ color: "#B4C6D9", maxWidth: 300, fontSize: 15, lineHeight: 1.6 }}>
                The developer community where you **Code hard**, **Build loud**, and **Create impact**.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" sx={{ color: CODEIS_NEON_GREEN, fontWeight: 700, mb: 2 }}>
                Explore
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Home', 'About', 'Projects', 'Events', 'Contact'].map((text) => (
                  <Link
                    href={`#${text.toLowerCase()}`}
                    key={text}
                    underline="none"
                    sx={{
                      color: "#B4C6D9",
                      fontSize: 15,
                      fontWeight: 500,
                      transition: 'color 0.3s',
                      '&:hover': {
                        color: CODEIS_NEON_BLUE,
                        textShadow: `0 0 10px ${CODEIS_NEON_BLUE}`
                      }
                    }}
                  >
                    {text}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Community & Social */}
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="h6" sx={{ color: CODEIS_NEON_GREEN, fontWeight: 700, mb: 2 }}>
                Connect
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      aria-label={link.label}
                      href={link.href}
                      target="_blank"
                      sx={{
                        color: CODEIS_NEON_GREEN,
                        border: '1px solid rgba(0,255,198,0.3)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 0 15px rgba(0,255,198,0.2)`,
                        '&:hover': {
                          color: '#ffffff',
                          backgroundColor: 'rgba(0,255,198,0.1)',
                          boxShadow: `0 0 25px rgba(0,255,198,0.4), 0 0 50px rgba(124,58,237,0.3)`
                        }
                      }}
                    >
                      {React.cloneElement(link.icon, { fontSize: "small" })}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>
          
          {/* Copyright and Bottom Line */}
          <Box sx={{ mt: 8, pt: 3, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6A7D92', fontSize: 14 }}>
              © {new Date().getFullYear()} CODEIS. All rights reserved. Built with <span style={{ color: '#FF007A' }}>♥</span> CODEIS.
            </Typography>
          </Box>

        </motion.div>
      </Container>
    </Box>
  );
}