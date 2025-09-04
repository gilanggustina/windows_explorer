
---

## 🚀 Teknologi yang Digunakan

### Frontend
- [Vue 3 (Composition API)](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PrimeVue](https://primevue.org/) (UI Components)
- [Axios](https://axios-http.com/) (HTTP Client)
- [Pinia](https://pinia.vuejs.org/) (State Management)
- [Vite](https://vitejs.dev/) (Bundler & Dev Server)
- [Bun](https://bun.sh/) runtime

### Backend
- [Express.js](https://expressjs.com/) (Web Framework)
- [Prisma ORM](https://www.prisma.io/) (Database ORM)
- [MariaDB](https://mariadb.org/) (Database)
- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/) runtime

### Tools
- [TurboRepo](https://turbo.build/repo) (Monorepo management)
- [Vitest](https://vitest.dev/) (Unit testing frontend)
- [Cypress](https://www.cypress.io/) (E2E testing)
- [ESLint + Prettier](https://eslint.org/) (Linting & Formatting)

---

## ⚙️ Setup & Instalasi

### 1️⃣ Clone Repository
```bash
git clone https://github.com/gilanggustina/windows_explorer.git
cd windows_explorer

bun install

DATABASE_URL="mysql://user:password@localhost:3306/explorer_db"
PORT=4000


VITE_API_URL="http://localhost:4000"


bun run dev:backend migrate
bun run dev:backend seed


# Jalankan backend
bun run dev:backend

# Jalankan frontend
bun run dev:frontend


🧪 Testing
Unit Test (Frontend)
bun run test:unit


E2E Test (Frontend)
bun run test:e2e


🧑‍💻 Kontributor
Cahaya Gilang Gustina – Fullstack Developer
(Vue 3, Express.js, Prisma, Turbo Monorepo, Bun Runtime)
