# Vijay Ram KP portfolio

Production: https://vijayramkp2002.vercel.app/

The website assets live in `public/`. The Vercel function in `api/resume.js` looks for the single PDF in the public Google Drive résumé folder on each request to `/resume` and redirects visitors to it. If Drive cannot be read or the folder contains zero or multiple PDFs, it opens the folder instead.

Run `npm test` to check the résumé route. After website code or design changes, deploy this directory with `npx vercel@latest deploy --prod`. Replacing the sole PDF in Drive does not require a deployment.
