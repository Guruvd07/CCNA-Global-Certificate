# NetAcademy CCNA Portal — Static Frontend

A premium, fully responsive static frontend for a dummy CCNA Global Certification portal.
Pure **HTML + CSS + Vanilla JS** — no React, no backend, no build step.

## Folder structure
```
public/portal/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── profile.html            # User profile
├── certificates.html       # Badges & certificates
├── certificate-view.html   # Cinematic certificate viewer
├── course-details.html     # Course syllabus
├── css/style.css
├── js/app.js               # Users, session, layout, helpers
├── assets/                 # (drop logos / images here)
└── certificates/
    ├── dhanraj.pdf
    ├── vedant.pdf
    └── aditya.pdf
```

## Premium users
Defined in `js/app.js` as `PREMIUM_USERS`:

- `dhanrajkshirsagar302@gmail.com` → Dhanraj Kshirsagar
- `vedant2727swami@gmail.com` → Vedant Swami
- `aditya.dabhade@mitaoe.ac.in` → Aditya Dabhade

Logging in with any other email shows a locked dashboard with a $200 enrollment card.

## Replacing certificate PDFs
Drop the real PDFs into `public/portal/certificates/` using these filenames:
```
dhanraj.pdf
vedant.pdf
aditya.pdf
```
The viewer dynamically embeds the correct file based on the logged-in email.

## Adding a new premium user
Edit `js/app.js` and add to `PREMIUM_USERS`:
```js
"new.email@example.com": {
  name: "Full Name",
  initials: "FN",
  country: "India",
  language: "English",
  goal: "Career goal",
  certificate: "certificates/new.pdf",
  certificateImg: "certificates/new.png"
}
```
Then add the matching PDF to `certificates/`.

## Customizing the course
Edit the `COURSE` object in `js/app.js` (title, weeks, skills, price, instructor, etc.).

## Deploy on Vercel
The portal is plain static files, so any host works. With this Lovable project:

- Visit the project root → it auto-redirects to `/portal/index.html`.
- For a standalone Vercel deploy, copy `public/portal/` to a new repo and deploy as a static site (no framework). Set the output directory to the folder containing `index.html`.

Quick standalone Vercel deploy:
1. Create a new GitHub repo with the contents of `public/portal/` at the root.
2. Import the repo into Vercel.
3. Framework preset: **Other**. Build command: *(empty)*. Output dir: `./`.
4. Deploy.

## Notes
- Session is stored in `localStorage` under `ccna_user`.
- Sign out via the icon in the top bar.
- All animations are pure CSS; no external animation libs.
