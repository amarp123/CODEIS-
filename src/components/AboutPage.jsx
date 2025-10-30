import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";

const items = [
  {
    icon: <CodeIcon fontSize="large" />,
    title: "Project Building",
    desc: "Real world projects that boost your resume and shape your identity as a developer.",
    color: "rgba(0,255,198,0.25)",
    glowColor: "rgba(0,255,198,0.4)"
  },
  {
    icon: <EmojiEventsIcon fontSize="large" />,
    title: "Hackathons",
    desc: "Go fast, break things, compete & push your limits in high-energy hackathons.",
    color: "rgba(0,255,255,0.22)",
    glowColor: "rgba(0,255,255,0.4)"
  },
  {
    icon: <LightbulbIcon fontSize="large" />,
    title: "Tech Innovation",
    desc: "Explore AI, Web3, AR/VR, Cloud, Linux — future-defining tech.",
    color: "rgba(124,58,237,0.3)",
    glowColor: "rgba(124,58,237,0.5)"
  },
  {
    icon: <GroupWorkIcon fontSize="large" />,
    title: "Team Collaboration",
    desc: "We grow together — communicating, leading and creating as a community.",
    color: "rgba(255,0,122,0.22)",
    glowColor: "rgba(255,0,122,0.4)"
  },
  {
    icon: <SchoolIcon fontSize="large" />,
    title: "Skill Development",
    desc: "Workshops, mentorship and real guidance to level-up professionally.",
    color: "rgba(0,255,133,0.28)",
    glowColor: "rgba(0,255,133,0.4)"
  },
  {
    icon: <TerminalIcon fontSize="large" />,
    title: "Open Source Spirit",
    desc: "Make your mark on the world through collaboration & public contributions.",
    color: "rgba(107,33,255,0.3)",
    glowColor: "rgba(107,33,255,0.5)"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function AboutSection() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: 14,
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(circle at 20% 20%, rgba(0,255,255,0.12), transparent 45%),
          radial-gradient(circle at 80% 85%, rgba(124,58,237,0.15), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(0,255,198,0.08), transparent 60%),
          #000`,
        "&::before": {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300FFC6\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.2,
          animation: 'float 30s ease-in-out infinite',
        },
        "@keyframes float": {
          "0%, 100%": { transform: 'translate(0, 0)' },
          "50%": { transform: 'translate(20px, -20px)' }
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <motion.div
              animate={{
                textShadow: [
                  '0 0 30px rgba(0,229,255,0.3)',
                  '0 0 50px rgba(0,229,255,0.5)',
                  '0 0 30px rgba(0,229,255,0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Typography
                variant="h3"
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
                Why CODEIS Exists
              </Typography>
            </motion.div>
            <Typography
              sx={{ 
                color: "#B4C6D9", 
                maxWidth: 770, 
                mx: "auto",
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.7,
                fontWeight: 400
              }}
            >
              We reshape curious minds into unstoppable developers.  
              <br />
              <strong style={{ color: '#00FFC6' }}>Code hard</strong> — <strong style={{ color: '#7C3AED' }}>Build loud</strong> — <strong style={{ color: '#00E5FF' }}>Create impact</strong>.
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Neon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              position: "relative",
              background: "rgba(5,5,15,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,255,255,0.15)",
              borderRadius: "28px",
              boxShadow: `
                0 0 60px rgba(0,255,255,0.1),
                0 20px 60px rgba(0,0,0,0.5),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
              px: { xs: 3, md: 8 },
              py: { xs: 5, md: 10 },
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: "28px",
                padding: '2px',
                background: 'linear-gradient(135deg, rgba(0,255,198,0.4), rgba(124,58,237,0.4), rgba(0,229,255,0.4))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0.5,
                animation: 'borderRotate 4s linear infinite',
              },
              "@keyframes borderRotate": {
                "0%": { backgroundPosition: '0% 50%' },
                "100%": { backgroundPosition: '200% 50%' }
              }
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 48,
                position: "relative",
                zIndex: 1
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    textAlign: index % 2 === 0 ? "left" : "right"
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -5, 5, -5, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        minWidth: 80,
                        minHeight: 80,
                        borderRadius: "20px",
                        background: `
                          ${item.color},
                          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent)
                        `,
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(0,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#00FFC6",
                        boxShadow: `
                          0 0 30px ${item.glowColor},
                          inset 0 0 20px rgba(0,255,255,0.1)
                        `,
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&::before": {
                          content: '""',
                          position: 'absolute',
                          top: '-50%',
                          left: '-50%',
                          width: '200%',
                          height: '200%',
                          background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
                          animation: 'rotate 4s linear infinite',
                          opacity: 0.3,
                        },
                        "&:hover": {
                          boxShadow: `
                            0 0 50px ${item.glowColor},
                            inset 0 0 30px rgba(0,255,255,0.2)
                          `,
                          transform: 'translateY(-5px)',
                        },
                        "@keyframes rotate": {
                          "0%": { transform: 'rotate(0deg)' },
                          "100%": { transform: 'rotate(360deg)' }
                        }
                      }}
                    >
                      <Box sx={{ position: "relative", zIndex: 1 }}>
                        {item.icon}
                      </Box>
                    </Box>
                  </motion.div>

                  <Box sx={{ maxWidth: 550, flex: 1 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 900, 
                        fontSize: { xs: 20, md: 24 },
                        color: "#ffffff",
                        mb: 1.5,
                        textShadow: '0 0 20px rgba(0,255,198,0.3)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: "#B4C6D9", 
                        fontSize: { xs: 15, md: 16 },
                        lineHeight: 1.7,
                        fontWeight: 400
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative floating elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,255,198,0.15), transparent)',
                filter: 'blur(40px)',
                animation: 'float 6s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: '8%',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent)',
                filter: 'blur(50px)',
                animation: 'float 8s ease-in-out infinite reverse',
                pointerEvents: 'none',
              }}
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}