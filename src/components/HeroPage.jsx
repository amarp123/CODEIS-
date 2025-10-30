import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Zap } from "lucide-react"; 
import codeIsLogo from '/src/assets/logo.jpg';

// --- Float3DBackground component remains the same ---
const Float3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.5 ? 'rgba(0,255,198,' : 'rgba(124,58,237,'
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.008;

      particles.forEach((p, i) => {
        p.x += p.speedX + Math.sin(time + i) * 0.3;
        p.y += p.speedY + Math.cos(time + i) * 0.3;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;
        ctx.fillStyle = p.color + opacity + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = p.color + (opacity * 0.4) + ')';
        ctx.lineWidth = 0.5;
        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      // Multiple 3D cubes
      const cubes = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 100, speed: 0.5 },
        { x: canvas.width * 0.8, y: canvas.height * 0.4, size: 80, speed: 0.7 },
        { x: canvas.width * 0.6, y: canvas.height * 0.7, size: 60, speed: 0.6 },
      ];

      cubes.forEach((cube, idx) => {
        ctx.save();
        ctx.translate(cube.x, cube.y);
        
        const rotX = time * cube.speed;
        const rotY = time * cube.speed * 1.2;
        
        const points = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ].map(([x, y, z]) => {
          let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
          let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
          let x1 = x * Math.cos(rotY) - z1 * Math.sin(rotY);
          let z2 = x * Math.sin(rotY) + z1 * Math.cos(rotY);
          const scale = 300 / (300 + z2 * 80);
          return [x1 * cube.size * scale, y1 * cube.size * scale, z2];
        });

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        edges.forEach(([a, b]) => {
          const gradient = ctx.createLinearGradient(
            points[a][0], points[a][1],
            points[b][0], points[b][1]
          );
          gradient.addColorStop(0, idx % 2 === 0 ? 'rgba(0,255,198,0.6)' : 'rgba(124,58,237,0.6)');
          gradient.addColorStop(1, idx % 2 === 0 ? 'rgba(124,58,237,0.6)' : 'rgba(0,255,198,0.6)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(points[a][0], points[a][1]);
          ctx.lineTo(points[b][0], points[b][1]);
          ctx.stroke();
        });

        points.forEach(([x, y, z]) => {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
          gradient.addColorStop(0, idx % 2 === 0 ? 'rgba(0,255,198,1)' : 'rgba(124,58,237,1)');
          gradient.addColorStop(0.5, idx % 2 === 0 ? 'rgba(124,58,237,0.8)' : 'rgba(0,255,198,0.8)');
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
};
// --- End Float3DBackground ---

const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.3
    } 
  }
};

const fadeUp = { 
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, 
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1]
    } 
  } 
};

export default function HeroPage() {
  const fullText = "where codeIs alive";
  const heroRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Typewriter Effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); // 100ms delay for typing speed
    
    return () => clearInterval(timer);
  }, []);

  // Mouse Parallax Effect for the Logo/Badge
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Calculate position relative to center and scale it down
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 30, // Adjust the divisor for sensitivity
          y: (e.clientY - rect.top - rect.height / 2) / 30, // Adjust the divisor for sensitivity
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box
      component="section"
      ref={heroRef} // Attach ref for mouse position
      sx={{
        // Keeps height locked to viewport, enabling centering
        height: "100vh", 
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(circle at 20% 30%, rgba(0,255,255,0.15) 0%, transparent 35%),
          radial-gradient(circle at 80% 20%, rgba(124,58,237,0.2) 0%, transparent 35%),
          radial-gradient(circle at 50% 90%, rgba(0,255,133,0.15) 0%, transparent 30%),
          radial-gradient(circle at 90% 80%, rgba(255,0,255,0.12) 0%, transparent 25%),
          #000`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Ensures content is vertically centered
        "&::before": {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300FFC6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.25,
          animation: 'slidePattern 25s linear infinite',
          zIndex: 0,
        },
        "@keyframes slidePattern": {
          "0%": { backgroundPosition: '0 0' },
          "100%": { backgroundPosition: '60px 60px' }
        }
      }}
    >
      <Float3DBackground />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          // Added responsive padding top/bottom to create buffer space
          py: { xs: 4, sm: 6, md: 8 }, 
          overflowY: 'auto' 
        }}
      >
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          style={{ 
            maxWidth: 900,
            width: '100%',
          }}
        >
          {/* Logo/Badge */}
          <motion.div variants={fadeUp} style={{ perspective: '1000px' }}>
            <motion.div
              initial={{ scale: 0, rotateY: 180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              style={{ 
                display: 'inline-block',
                padding: '4px',
                transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
                marginBottom: '32px' // Increased margin below logo for spacing
              }}
            >
              <motion.div
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 0,
                  borderRadius: '999px', 
                  background: 'linear-gradient(135deg, #00FFC6, #7C3AED)',
                  boxShadow: '0 0 20px rgba(0,255,198,0.5), 0 0 40px rgba(124,58,237,0.3)',
                }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0,255,198,0.5), 0 0 40px rgba(124,58,237,0.3)',
                    '0 0 30px rgba(0,255,198,0.8), 0 0 60px rgba(124,58,237,0.5)',
                    '0 0 20px rgba(0,255,198,0.5), 0 0 40px rgba(124,58,237,0.3)',
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Box
                    component="img"
                    src={codeIsLogo}
                    alt="CodeIS Logo"
                    sx={{
                        width: { xs: 88, sm: 108 }, 
                        height: { xs: 88, sm: 108 },
                        objectFit: 'cover',
                        p: 1, 
                        borderRadius: '999px', 
                        background: '#111', 
                        filter: 'drop-shadow(0 0 8px rgba(0,255,198,0.6))', 
                        border: '2px solid rgba(0,0,0,0.5)',
                    }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Title and Typewriter */}
          <motion.div variants={fadeUp}>
            <Typography 
              component="h1" 
              variant="h1"
              sx={{ 
                // Reduced margins for tighter grouping
                mt: 0, 
                mb: 2, 
                color: "#ffffff", 
                fontWeight: 900, 
                lineHeight: 1.1, 
                fontSize: { xs: "48px", sm: "64px", md: "80px", lg: "96px" },
                textShadow: '0 0 50px rgba(0,255,198,0.4), 0 0 100px rgba(124,58,237,0.3)',
                letterSpacing: '-0.02em'
              }}
            >
              CodeIs
              <br /> 
              {/* Typewriter Effect */}
              <span style={{ 
                background: 'linear-gradient(135deg, #00FFC6, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                minHeight: '1.2em',
                display: 'inline-block'
              }}>
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ 
                    color: '#00FFC6', 
                    display: displayText.length < fullText.length ? 'inline' : 'none',
                    marginLeft: '2px',
                    fontSize: '1em'
                  }}
                >
                  |
                </motion.span>
              </span>
            </Typography>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={fadeUp}>
            <Typography 
              sx={{ 
                color: "#B4C6D9", 
                mb: 4, // Reduced margin to bring button closer to tagline
                fontSize: { xs: 18, md: 22 },
                lineHeight: 1.7,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Empowering students to <span style={{color: '#00FFC6', fontWeight: 600}}>code</span>, 
              <span style={{color: '#7C3AED', fontWeight: 600}}> innovate</span>, and 
              <span style={{color: '#00FFC6', fontWeight: 600}}> lead</span> through technology.
            </Typography>
          </motion.div>

          {/* Button */}
          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                href="https://docs.google.com/forms/YOUR_FORM_LINK"
                target="_blank"
                variant="contained"
                sx={{
                  borderRadius: "999px",
                  px: 6,
                  py: 2.5,
                  fontSize: { xs: 18, md: 22 },
                  fontWeight: 800,
                  textTransform: "none",
                  background: "linear-gradient(135deg,#00FFC6,#7C3AED,#00FFC6)",
                  backgroundSize: '200% auto',
                  boxShadow: "0 0 40px rgba(0,255,198,0.5), 0 15px 40px rgba(124,58,237,0.4)",
                  position: 'relative',
                  overflow: 'hidden',
                  "&::before": {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    animation: 'rotate 3s linear infinite',
                  },
                  "&:hover": { 
                    backgroundPosition: 'right center',
                    boxShadow: "0 0 60px rgba(0,255,198,0.7), 0 20px 50px rgba(124,58,237,0.5)",
                  },
                  "@keyframes rotate": {
                    "0%": { transform: 'rotate(0deg)' },
                    "100%": { transform: 'rotate(360deg)' }
                  }
                }}
              >
                Join CodeIS
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}