# Resume Upload Server

This small Express server accepts a resume upload and commits it to the repository using the GitHub API, storing it at `public/resume.pdf` by default.

## Setup (local)

1. Node 18+ recommended.
2. Install dependencies:

```powershell
cd server
npm install
```

3. Create a GitHub Personal Access Token (PAT) with `repo` scope and set it as an environment variable.

- Windows PowerShell example:

```powershell
$env:GITHUB_TOKEN = 'ghp_...'
$env:GITHUB_REPO = 'Saurabhchhiller/saurabh-chhiller-portfolio-1'
$env:COMMITTER_NAME = 'Saurabh Chhiller'
$env:COMMITTER_EMAIL = 'schhiller1@gmail.com'
# Also set an upload token to protect the endpoint
$env:UPLOAD_TOKEN = 'a-strong-random-secret'
node index.js
```

4. Run the server:

```powershell
npm run dev
```

The server listens by default on port `4000` and exposes `POST /api/upload-resume` which accepts a multipart `resume` field.

## Deployment

- You can deploy this as a small server on Heroku / Render / DigitalOcean App Platform, or as a serverless function using providers that allow writing to the GitHub API with a PAT stored in environment variables.
- Set `GITHUB_TOKEN`, `GITHUB_REPO` and optionally `TARGET_PATH` (for an alternate path) in the host's environment settings.

## Security

- Keep the PAT secret. Only deploy the server to trusted platforms and keep `UPLOAD_TOKEN` secret.
- The server expects a header `x-admin-token: <UPLOAD_TOKEN>` or `Authorization: Bearer <UPLOAD_TOKEN>` on the upload request.
- Limit accepted file types and size on both client and server (default: PDF/DOC/DOCX, 10MB).

### Admin UI

- Set the same `UPLOAD_TOKEN` value in the Admin UI (stored locally in the browser) before uploading. The Admin UI will send the token in the `x-admin-token` header.

### Deployment notes

- When deploying, set `GITHUB_TOKEN`, `UPLOAD_TOKEN`, and other env vars in the host environment (Render/Heroku/Vercel project settings).
- Consider additional protection like IP allow-listing, Basic auth, or OAuth if exposing this endpoint publicly.

## Notes

- The server uses the GitHub REST API to create/update a file in `main` branch. Ensure the PAT has push rights to the repository.
- The returned URL uses the `raw.githubusercontent.com` URL format for direct downloads. If your site is hosted (Vercel/GitHub Pages), you can serve `/resume.pdf` directly from the `public/` directory after deployment.
