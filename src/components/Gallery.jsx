import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const images = [
  "/src/assets/gallery1.jpg",
  "/src/assets/gallery2.jpg",
  "/src/assets/gallery3.jpg",
  "/src/assets/gallery2.jpg",
  "/src/assets/gallery3.jpg",
  "/src/assets/gallery1.jpg",
  "/src/assets/gallery2.jpg",
  "/src/assets/gallery3.jpg",
  "/src/assets/gallery2.jpg",
  "/src/assets/gallery3.jpg",
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
            height: 380,
          }}
        >
          <Box sx={{ overflow: "hidden", width: "100%", height: "100%" }}>
            <motion.div
              style={{ display: "flex" }}
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                x: { repeat: Infinity, duration: 20, ease: "linear" },
              }}
            >
              {[...images, ...images].map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt="gallery"
                  sx={{
                    width: 380,
                    height: 380,
                    objectFit: "cover",
                    borderRadius: 0,
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
