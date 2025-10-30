import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Users as UsersIcon, Award, Linkedin, Instagram } from "lucide-react";

// Team member data with MUI-compatible gradient colors
const teamMembers = [
  {
    name: "Bharath P",
    role: "President",
    image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=3b82f6&color=fff&size=256",
    linkedin: "#",
    instagram: "#",
    // Use for the main gradient accents
    gradientStart: "#3b82f6", // blue-600
    gradientEnd: "#06b6d4", // cyan-600
    textGradient: "linear-gradient(90deg, #60a5fa, #47b2f6)", // blue-400, cyan-400
  },
  {
    name: "Swaroop P",
    role: "Vice President",
    image: "https://ui-avatars.com/api/?name=Arjun+Patel&background=8b5cf6&color=fff&size=256",
    linkedin: "#",
    instagram: "#",
    gradientStart: "#8b5cf6", // purple-600
    gradientEnd: "#ec4899", // pink-600
    textGradient: "linear-gradient(90deg, #a78bfa, #ec6b9d)", // purple-400, pink-400
  },
  {
    name: "Amar Pujari",
    role: "Technical Head",
    image: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=ec4899&color=fff&size=256",
    linkedin: "#",
    instagram: "#",
    gradientStart: "#ec4899", // pink-600
    gradientEnd: "#f43f5e", // rose-600
    textGradient: "linear-gradient(90deg, #ec6b9d, #f687a4)", // pink-400, rose-400
  },
  {
    name: "Dhanush Urs M K",
    role: "Events Coordinator",
    image: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=06b6d4&color=fff&size=256",
    linkedin: "#",
    instagram: "#",
    gradientStart: "#06b6d4", // cyan-600
    gradientEnd: "#3b82f6", // blue-600
    textGradient: "linear-gradient(90deg, #47b2f6, #60a5fa)", // cyan-400, blue-400
  },
  
];

// Helper component for the animated card
const TeamMemberCard = ({ member, index }) => {
  const { name, role, image, linkedin, instagram, gradientStart, gradientEnd, textGradient } = member;

  const cardVariants = {
    rest: { y: 0 },
    hover: { y: -10, transition: { type: "spring", stiffness: 300 } }
  };

  const gradientBorder = `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`;
  const roleBadgeGradient = `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      variants={cardVariants}
      whileHover="hover"
      style={{ position: "relative" }}
    >
      {/* Animated gradient border (Outer glow) */}
      <Box
        sx={{
          position: "absolute",
          inset: -3,
          background: gradientBorder,
          borderRadius: 4, // Corresponds to rounded-3xl
          opacity: 0,
          filter: "blur(12px)",
          transition: "opacity 0.5s",
          "&:hover": { opacity: 1 },
        }}
      />
      
      {/* Main Card Content */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4, // rounded-3xl
          overflow: "hidden",
          background: "rgba(15, 23, 42, 0.9)", // slate-900/90
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(51, 65, 85, 0.5)", // slate-800/50
          transition: "border 0.3s",
          "&:hover": { border: "1px solid rgba(71, 85, 105, 0.5)" } // slate-700/50
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden", aspectRatio: "1/1" }}>
          {/* Image */}
          <motion.img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.1 }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.8) 50%, transparent 100%)",
            }}
          />

          {/* Enhanced Social Icons */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              opacity: 0,
              transition: "opacity 0.3s",
              "&:hover": { opacity: 1 },
            }}
          >
            {/* LinkedIn Button */}
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              style={{ display: 'block' }}
            >
              <IconButton
                size="large"
                sx={{
                  borderRadius: "50%",
                  background: "rgba(37, 99, 235, 0.8)", // blue-600/80
                  color: "#fff",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(96, 165, 250, 0.3)", // blue-400/30
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.5)", // shadow-blue-500/50
                  "&:hover": { background: "#3b82f6" } // blue-500
                }}
              >
                <Linkedin size={20} />
              </IconButton>
            </motion.a>
            
            {/* Instagram Button */}
            <motion.a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              style={{ display: 'block' }}
            >
              <IconButton
                size="large"
                sx={{
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))", // purple-600/80 to pink-600/80
                  color: "#fff",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(167, 139, 250, 0.3)", // purple-400/30
                  boxShadow: "0 8px 25px rgba(139, 92, 246, 0.5)", // shadow-purple-500/50
                  "&:hover": { 
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)" // purple-500 to pink-500
                  }
                }}
              >
                <Instagram size={20} />
              </IconButton>
            </motion.a>
          </Box>

          {/* Role badge */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              opacity: 0,
              transition: "opacity 0.3s",
              "&:hover": { opacity: 1 },
            }}
          >
            <Box
              sx={{
                px: 1.5,
                py: 0.75,
                borderRadius: 4,
                background: roleBadgeGradient,
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                gap: 1,
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)"
              }}
            >
              <Award size={16} style={{ color: "white" }} />
              <Typography variant="body2" sx={{ color: "white", fontSize: 14 }}>
                {role}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 3, textAlign: "center", position: "relative" }}>
          {/* Decorative line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 64,
              height: 4,
              background: roleBadgeGradient,
              borderRadius: "9999px"
            }}
          />
          
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              color: "white",
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
              fontWeight: 700,
              transition: "all 0.3s",
              "&:hover": {
                background: textGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              background: roleBadgeGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600
            }}
          >
            {role}
          </Typography>
        </Box>

        {/* Glow effect (Inner) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
            opacity: 0,
            filter: "blur(20px)",
            transition: "opacity 0.5s",
            zIndex: -1,
            "&:hover": { opacity: 0.1 }
          }}
        />
      </Box>
    </motion.div>
  );
};

export default function MeetOurTeamPage() {
  return (
    <Box
      sx={{
        py: 16,
        px: { xs: 2, sm: 4 },
        minHeight: "100vh",
        background: `linear-gradient(to bottom, #000000, #0a0a0a, #000000)`, // from-black via-slate-950 to-black
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background effects (Blurry circles) */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            right: "25%",
            width: 384, // w-96
            height: 384, // h-96
            background: "rgba(59, 130, 246, 0.1)", // blue-500/10
            borderRadius: "50%",
            filter: "blur(48px)", // blur-3xl
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "25%",
            left: "25%",
            width: 384, // w-96
            height: 384, // h-96
            background: "rgba(168, 85, 247, 0.1)", // purple-500/10
            borderRadius: "50%",
            filter: "blur(48px)", // blur-3xl
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        
      
          
         

        
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
                           mb: 4,
                           fontSize: { xs: "38px", md: "50px" },
                           letterSpacing: '-0.02em',
                           animation: 'shimmer 4s linear infinite',
                           "@keyframes shimmer": {
                             "0%": { backgroundPosition: '0% center' },
                             "100%": { backgroundPosition: '200% center' }
                           }
                     }}
                   
                 >
                   Meet Our Team
                 </Typography>
                 
          
          {/* Subtitle */}
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: { xs: "1.125rem", sm: "1.25rem" }, // xl md:text-2xl
              color: "#cbd5e1", // text-slate-300
              maxWidth: 768, // max-w-3xl
              mx: "auto",
            }}
          >
            The passionate individuals driving CodeIS forward
          </Typography>
        </motion.div>

        {/* Team Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}