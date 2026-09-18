import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

import gallery1 from '../assets/gallery1.jpg';
import gallery2 from '../assets/gallery2.jpg';
import gallery3 from '../assets/gallery3.jpg';
import gallery4 from '../assets/gallery4.jpg';
import gallery5 from '../assets/gallery5.jpg';
import gallery6 from '../assets/gallery6.jpg';
import gallery7 from '../assets/gallery7.jpg';
import gallery8 from '../assets/gallery8.jpg';
import gallery9 from '../assets/gallery9.jpg';
import gallery10 from '../assets/gallery10.jpg';
import gallery11 from '../assets/gallery11.jpg';
import gallery12 from '../assets/gallery12.jpg';
import gallery13 from '../assets/gallery13.jpg';
import gallery14 from '../assets/gallery14.jpg';

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
  gallery13,
  gallery14,
];

export default function GallerySection() {
  return (
    <Box
      component="section"
      sx={{
        py: 12,
        background: `radial-gradient(circle at 20% 30%, rgba(0,255,255,0.12) 0%, transparent 25%),
                     radial-gradient(circle at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 25%),
                     radial-gradient(circle at 50% 90%, rgba(0,255,133,0.12) 0%, transparent 20%),
                     #000`,
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="lg">

          <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
          >


         
        <Typography
          variant="h4"
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
          Club Gallery
        </Typography>
        </motion.div>

        {/* ✅ Full edge card */}
        <Box
          sx={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: 0,
            border: "1px solid rgba(0,255,255,0.08)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 35px rgba(0,255,255,0.10)",
            p: 0,
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            height: { xs: 280, sm: 380 },
          }}
        >
          <Box sx={{ overflow: "hidden", width: "100%", height: "100%" }}>
            <motion.div
              style={{ display: "flex", width: "max-content" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: { repeat: Infinity, duration: 25, ease: "linear" },
              }}
            >
              {[...images, ...images].map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt="gallery"
                  sx={{
                    width: { xs: 280, sm: 380 },
                    minWidth: { xs: 280, sm: 380 },
                    height: { xs: 280, sm: 380 },
                    objectFit: "cover",
                    borderRadius: 0,
                    flexShrink: 0,
                  }}
                />
              ))}
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
