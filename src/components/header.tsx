import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ p: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              color="inherit"
              href="/"
              fontSize="20px"
              underline="none"
              sx={{ cursor: "pointer" }}
            >
              Fit-Caloria
            </Link>
          </Typography>
          <Box display="flex" gap={2}>
            <Link
              color="inherit"
              href="/about"
              fontSize="18px"
              underline="none"
              sx={{ cursor: "pointer" }}
            >
              Sobre
            </Link>
            <Link
              color="inherit"
              href="/tips"
              fontSize="18px"
              underline="none"
              sx={{ cursor: "pointer" }}
            >
              Dicas
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
