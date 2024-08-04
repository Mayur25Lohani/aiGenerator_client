import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { inputs: text });
      setSummary(data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || err.message || "An error occurred");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "50%" : "90%"}
      p={4}
      m="auto"
      borderRadius={3}
      sx={{ boxShadow: 3 }}
      backgroundColor={theme.palette.background.paper}
    >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Summarize Text
        </Typography>
        <TextField
          placeholder="Enter your text here..."
          type="text"
          multiline
          required
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mb: 2, color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main }}
        >
          Generate Summary
        </Button>
        <Typography align="center">
          Not this Tool? <Link to="/">Return to Homepage</Link>
        </Typography>
      </form>

      <Card
        sx={{
          mt: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 2,
          height: "auto",
          minHeight: "200px",
          bgcolor: theme.palette.background.default,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", color: theme.palette.text.primary }}
        >
          {summary || "Summary will appear here"}
        </Typography>
      </Card>
    </Box>
  );
};

export default Summary;
