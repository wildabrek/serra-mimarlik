import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Increase limits for large payloads (base64 images)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Data files path
const DATA_DIR = path.join(__dirname, 'data');

// API endpoints

// Hero
app.get('/api/hero', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'hero.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading hero.json:', error);
    res.status(500).json({ error: 'Failed to read hero data' });
  }
});

app.put('/api/hero', async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 2);
    await fs.writeFile(path.join(DATA_DIR, 'hero.json'), data, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing hero.json:', error);
    res.status(500).json({ error: 'Failed to write hero data' });
  }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'projects.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading projects.json:', error);
    res.status(500).json({ error: 'Failed to read projects data' });
  }
});

app.put('/api/projects', async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 2);
    await fs.writeFile(path.join(DATA_DIR, 'projects.json'), data, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing projects.json:', error);
    res.status(500).json({ error: 'Failed to write projects data' });
  }
});

// About
app.get('/api/about', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'about.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading about.json:', error);
    res.status(500).json({ error: 'Failed to read about data' });
  }
});

app.put('/api/about', async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 2);
    await fs.writeFile(path.join(DATA_DIR, 'about.json'), data, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing about.json:', error);
    res.status(500).json({ error: 'Failed to write about data' });
  }
});

// Services
app.get('/api/services', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'services.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading services.json:', error);
    res.status(500).json({ error: 'Failed to read services data' });
  }
});

app.put('/api/services', async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 2);
    await fs.writeFile(path.join(DATA_DIR, 'services.json'), data, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing services.json:', error);
    res.status(500).json({ error: 'Failed to write services data' });
  }
});

// Contact
app.get('/api/contact', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'contact.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading contact.json:', error);
    res.status(500).json({ error: 'Failed to read contact data' });
  }
});

app.put('/api/contact', async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 2);
    await fs.writeFile(path.join(DATA_DIR, 'contact.json'), data, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing contact.json:', error);
    res.status(500).json({ error: 'Failed to write contact data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`💡 API endpoints: /api/hero, /api/projects, /api/about, /api/services, /api/contact`);
});
