const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const app = express();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // required
const REPO = process.env.GITHUB_REPO || 'Saurabhchhiller/saurabh-chhiller-portfolio-1';
const TARGET_PATH = process.env.TARGET_PATH || 'public/resume.pdf';
const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN; // simple shared secret for uploads

if (!GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN is not set. The server will not be able to commit to GitHub.');
}
if (!UPLOAD_TOKEN) {
  console.warn('UPLOAD_TOKEN is not set. Upload endpoint will be disabled until a token is configured.');
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
  if (!UPLOAD_TOKEN) return res.status(500).json({ message: 'Upload feature disabled on server (no UPLOAD_TOKEN configured).' });

  const incomingToken = req.headers['x-admin-token'] || req.headers['authorization'];
  let tokenValue = '';
  if (typeof incomingToken === 'string') {
    tokenValue = incomingToken.startsWith('Bearer ') ? incomingToken.slice(7) : incomingToken;
  }

  if (!tokenValue || tokenValue !== UPLOAD_TOKEN) {
    return res.status(401).json({ message: 'Invalid or missing upload token' });
  }

  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  if (!GITHUB_TOKEN) return res.status(500).json({ message: 'Server not configured with GITHUB_TOKEN' });

  try {
    const [owner, repo] = REPO.split('/');
    const content = req.file.buffer.toString('base64');

    // try to get existing file to retrieve sha
    let sha = undefined;
    try {
      const getResp = await octokit.repos.getContent({ owner, repo, path: TARGET_PATH });
      if (Array.isArray(getResp.data)) {
        // unexpected, but handle
        sha = undefined;
      } else {
        sha = getResp.data.sha;
      }
    } catch (err) {
      // file likely doesn't exist yet — continue without sha
      sha = undefined;
    }

    const message = `Update resume: ${new Date().toISOString()}`;

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: TARGET_PATH,
      message,
      content,
      sha,
      committer: {
        name: process.env.COMMITTER_NAME || 'Portfolio Admin',
        email: process.env.COMMITTER_EMAIL || 'noreply@example.com',
      },
      author: {
        name: process.env.COMMITTER_NAME || 'Portfolio Admin',
        email: process.env.COMMITTER_EMAIL || 'noreply@example.com',
      }
    });

    const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${TARGET_PATH}`;
    return res.json({ url, message: 'Resume uploaded and published to repository.' });
  } catch (err) {
    console.error('Commit error', err);
    return res.status(500).json({ message: 'Failed to commit file to GitHub', detail: String(err) });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
