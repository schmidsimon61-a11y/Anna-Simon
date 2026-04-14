import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/rsvp", async (req, res) => {
    const rsvpData = req.body;
    console.log("Received RSVP:", rsvpData);

    // In a real app, you'd save to a database here.
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Wedding Website" <${process.env.SMTP_USER}>`,
          to: "schmidsimon61@gmail.com",
          subject: `New RSVP from ${rsvpData.name}`,
          text: JSON.stringify(rsvpData, null, 2),
          html: `<h3>New RSVP Received</h3><pre>${JSON.stringify(rsvpData, null, 2)}</pre>`,
        });
      } catch (error) {
        console.error("Failed to send RSVP email:", error);
      }
    }

    res.status(200).json({ message: "RSVP received successfully!" });
  });

  app.post("/api/contact", async (req, res) => {
    const contactData = req.body;
    console.log("Received Message:", contactData);

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Wedding Website" <${process.env.SMTP_USER}>`,
          to: "schmidsimon61@gmail.com",
          subject: `New Message from ${contactData.name}`,
          text: contactData.message,
          html: `<p><strong>From:</strong> ${contactData.name}</p><p><strong>Message:</strong> ${contactData.message}</p>`,
        });
      } catch (error) {
        console.error("Failed to send contact email:", error);
      }
    }

    res.status(200).json({ message: "Message sent successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
