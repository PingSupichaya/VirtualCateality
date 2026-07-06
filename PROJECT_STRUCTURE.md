# VirtualCateality — Project Structure

A cat-adoption/simulation web app built for HackTheKitty. Users log in (Google OAuth or anonymously), pick a cat either manually or via a personality quiz, then move on to a pet-care simulation.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4, React Router v7, `@react-oauth/google` |
| Backend  | Express 5 (TypeScript), `cors`, `morgan`, `pg` |
| Database | PostgreSQL |

## Root Layout

```
VirtualCateality/
├── client/          # React + Vite frontend
├── server/          # Express + TypeScript backend
├── database/        # SQL schema and seed data
└── README.md
```

---

## `client/` — Frontend (React + Vite)

```
client/
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── package.json
└── src/
    ├── main.tsx              # App entry: router setup, providers, layouts, routes
    ├── index.css             # Tailwind + global styles
    ├── mocksdata.ts          # Mock cat data, quiz questions/stories, scoring logic
    ├── assets/               # Cat breed images (Bengal, British, MaineCoon, etc.) and SVG backgrounds
    ├── components/
    │   ├── Components.tsx    # Reusable UI: NavBtn, Btn, LoginBtn, QuizBtn, AnsBtn, CatCard
    │   ├── NavBar.tsx        # Top navigation bar (login/logout, profile, nav links)
    │   └── Icons.tsx         # Inline SVG icon components (User, LogOut)
    ├── context/
    │   ├── AuthContext.tsx   # Google login / anonymous login / logout state via React Context
    │   └── CatContext.tsx    # Tracks the user's currently selected cat
    ├── lib/
    │   └── catImages.ts      # Maps breed name → bundled cat image asset (images stay client-side)
    ├── services/
    │   ├── api.ts             # Fetch wrapper + API calls (auth, cats, quiz, selected cat) — talks to backend
    │   └── types.ts           # Shared response/request TypeScript types matching the backend
    └── pages/
        ├── web/
        │   ├── HomePage.tsx       # Landing page ("/home")
        │   ├── LoginPage.tsx      # Google OAuth / anonymous login ("/login")
        │   ├── DecisionPage.tsx   # Choose "select cat myself" vs "take quiz" ("/select")
        │   ├── SelectCatPage.tsx  # Manual cat picker grid ("/selectcat")
        │   └── SimulationPage.tsx # Pet-care simulation (WIP, "/simulation/:catId")
        └── quiz/
            ├── QuizHomePage.tsx     # Quiz intro ("/quiz")
            ├── QuizQuestionPage.tsx # Question + story flow, scores answers ("/quiz-question")
            └── QuizResult.tsx       # Shows top 3 matching cats based on quiz score ("/quiz/result")
```

### Routing (`main.tsx`)

| Path                 | Page              | Layout     |
|----------------------|-------------------|------------|
| `/`                  | redirect → `/home`| —          |
| `/home`              | HomePage          | Layout (navbar) |
| `/login`             | LoginPage         | SidePic    |
| `/select`            | DecisionPage      | Layout     |
| `/selectcat`         | SelectCatPage     | Layout     |
| `/simulation/:catId` | SimulationPage    | Layout     |
| `/quiz`              | QuizHomePage      | QuizLayout |
| `/quiz-question`     | QuizQuestionPage  | QuizLayout |
| `/quiz/result`       | QuizResult        | QuizLayout |

### State / Context

- **AuthContext** — manages `profile` (Google user), `isAnonymous`, `isLoggedIn`; exposes `loginWithGoogle`, `loginAsAnonymous`, `logout`.
- **CatContext** — tracks `selectedCatId` for the currently chosen cat (persistence to backend is stubbed out, marked TODO).

### Data flow (current state)

- All cat and quiz data now comes from the backend (`/api/cats`, `/api/quiz/questions`, `/api/quiz/result`) — `mocksdata.ts` has been removed.
- `services/api.ts` targets `VITE_API_URL` (defaults to `http://localhost:3000/api`), auto-attaches the stored JWT as `Authorization: Bearer <token>`, and is used directly by `AuthContext`, `CatContext`, `SelectCatPage`, `QuizQuestionPage`, and `QuizResult`.
- Login is Google-only. On success the client stores the app JWT (`localStorage`, key `vc_auth_token`) and only keeps the username in memory (no account page, no anonymous accounts persisted).
- The quiz page fetches questions from the server, collects one `answerId` per question, and submits them to `/api/quiz/result`, which returns the matched cluster + cats. `mocksdata`'s Euclidean-distance matching was replaced by the server-side percentage/cluster algorithm (see backend section below).

---

## `server/` — Backend (Express + TypeScript)

```
server/
├── server.ts                 # App entry: Express setup, CORS, morgan logging, routes, error handler
├── db.ts                      # pg Pool, configured from env
├── utils.ts                   # getErrorMessage() helper for normalizing thrown errors
├── config/
│   └── env.ts                  # Loads & validates environment variables (dotenv)
├── utils/
│   └── jwt.ts                  # sign/verify helpers for the app's own JWT (wraps Google's "sub")
├── types/
│   └── source-map-support-register.d.ts  # ambient module decl (no published types for the subpath import)
├── tsconfig.json
├── package.json
├── .env / .env.example        # Local secrets (gitignored) / documented template
├── api-test.http              # Manual REST client requests for every route
├── routes/
│   ├── authRoute.ts            # POST /google (verify Google ID token, upsert user, issue JWT), GET /me
│   ├── catsRoute.ts             # GET / (list), GET /:id
│   ├── quizRoute.ts             # GET /questions, POST /result (cluster matching)
│   └── userRoute.ts             # GET/POST /selected-cat (JWT-protected)
├── middlewares/
│   ├── auth.ts                 # Verifies "Authorization: Bearer <jwt>", sets req.userToken
│   ├── errorHandler.ts         # Centralized error handler → JSON error response
│   └── logger.ts               # Custom request logger (unused, morgan handles logging)
└── dist/                       # Compiled JS output (tsc build target)
```

### API Routes (mounted under `/api`)

| Method | Path                    | Auth | Description |
|--------|--------------------------|------|-------------|
| POST   | `/api/auth/google`       | none | Verifies a Google ID token, upserts the user (`users.token` = Google `sub`), returns an app JWT + `{ name, email, picture }`. Anonymous sessions are never written to the DB. |
| GET    | `/api/auth/me`           | JWT  | Returns the current user's profile (used to display the username only). |
| GET    | `/api/cats`              | none | Lists all cats (`catId`, `breed`, `personality`, `cluster`). |
| GET    | `/api/cats/:id`          | none | Gets a single cat. |
| GET    | `/api/quiz/questions`    | none | Questions + answers (text only, no scores) + any story pages shown before each question. |
| POST   | `/api/quiz/result`       | none | Body `{ answerIds: number[] }` (one per question). Computes axis totals, normalizes against per-question max scores, buckets into a cluster, and returns the matching cats. |
| GET    | `/api/user/selected-cat` | JWT  | Returns the user's most recently saved cat (`{ catId }`, or `null`). |
| POST   | `/api/user/selected-cat` | JWT  | Body `{ catId: number }`. Upserts a `cat_status` row for the user. |

### Quiz → cluster matching algorithm

1. Sum the user's `interactionScore`/`aggressiveScore`/`shynessScore` across their 7 submitted answers → `userScore`.
2. Divide each axis by the sum of that axis's max-possible-per-question score across all questions → `pct` (0.0–1.0).
3. Bucket into a cluster:
   - `pct.aggressive > 0.6` → cluster 4
   - else `pct.interaction > 0.55 && pct.shyness > 0.55` → cluster 3
   - else all three axes `< 0.4` → cluster 2
   - else → cluster 1
4. `SELECT * FROM cats WHERE cluster = clusterId`.

### Auth flow

1. Client gets a Google ID token via `@react-oauth/google`.
2. Client POSTs it to `/api/auth/google`. Server verifies it with `google-auth-library`, upserts a `users` row keyed by the Google `sub`, and signs an app JWT `{ sub }` (7-day expiry).
3. Client stores the JWT in `localStorage` and sends it as `Authorization: Bearer <jwt>` on subsequent requests.
4. Protected routes (`/api/user/*`) use the `auth` middleware to verify the JWT and attach `req.userToken`.
5. "Continue as anonymous" never calls the backend — no token, no DB row, nothing persisted, matching the requirement to only keep Google-authenticated users.

### Environment variables (`server/.env`, gitignored)

`PORT`, `CLIENT_ORIGIN`, `PGHOST`/`PGPORT`/`PGUSER`/`PGPASSWORD`/`PGDATABASE`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`, `JWT_EXPIRES_IN`. See `.env.example` for a template — the Postgres password is no longer hardcoded in `server.ts`.

---

## `database/` — PostgreSQL Schema

```
database/
├── db_schema.sql   # Table definitions
└── db_seeds.sql     # Seed data
```

### Schema (`db_schema.sql`)

| Table         | Purpose |
|---------------|---------|
| `users`       | `token` (primary key, = Google `sub`), `name`, `email`, `picture`, `createdAt` — Google-authenticated users only |
| `cats`        | Cat catalog: `catId`, `breed`, `personality` (array), `imgPath`, `cluster` |
| `cat_status`  | Per-user pet state: hunger, happiness, cleanness, health, linked to `users` + `cats` |
| `questions`   | Quiz questions |
| `answers`     | Quiz answers per question, with `interactionScore`, `aggressiveScore`, `shynessScore` |
| `stories`     | Narrative story pages shown before quiz questions, ordered by `pageOrder` |

This mirrors the frontend's `mocksdata.ts` structure (cats with personality/scores, quiz questions/answers/stories) — the intent is clearly to move that mock data into the real database once the backend routes are built out.

---

## Gaps / Work-in-Progress (as of this writing)

- `SimulationPage.tsx` is still an empty stub — planned to embed a 2D Godot game where the user plays with their selected cat.
- `cat_status` (hunger/happiness/cleanness/health) has DB support but no API routes yet — nothing consumes it until the simulation page exists.
- No refresh-token rotation or logout-everywhere mechanism — the JWT is just cleared client-side on logout (it remains valid server-side until it expires).
