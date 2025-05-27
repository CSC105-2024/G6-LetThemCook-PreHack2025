## :pushpin: G6-LetThemCook

LetThemCook is a web applicaton that allows users to share their recipes like a social media blog. It is designed to be both visually engaging and functonally practcal, with features that separate ingredient lists and step-by-step instructons. Users can categorize recipes by natonality (e.g., Thai, Japanese) and type (e.g., dessert, fried, boiled). The main objectve is to provide a digital recipe book where users can record and access their recipes anytme, anywhere.\

---

## :rocket: Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CSC105-2024/G6-Memopen.git
   cd G6-Memopen
   ```
---
## :hammer: Frontend - React
### :wrench: Tech Stack

- React
- React DOM
- React Router DOM
- React Hook Form
- Tailwind Css
- Zod
- Font Awesome
  - @fortawesome/fontawesome-svg-core
  - @fortawesome/free-solid-svg-icons
  - @fortawesome/react-fontawesome
- @hookform/resolvers
- @tailwindcss/vite/

### :rocket:  Getting Started - React Client
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The client will be running on [http://localhost:5173](http://localhost:5173) (or similar, depending on your setup).
---
## :wrench: Backend - Node.js

### :hammer_and_wrench: Tech Stack

- @hono/node-server
- @prisma/client
- @types/bcrypt
- Bcrypt
- Dotenv
- Hono
- jsonwebtoken
- uuid

### :electric_plug: API Endpoints
- Authentication
  
|Method|Endpoint |Description                |
|------|---------|---------------------------|
|POST  |/auth/signup| Sign up new user account  |
|POST  |/auth/login| Login using username and password  |
|PATCH  |/auth/updated-Profile| Update user profile information  |
|GET  |/auth/getUserData/:userId| Fetch user data by ID  |
|POST |/auth/upload-profile-img| Update user's profile image  |
- Post Recipes

|Method|Endpoint |Description                |
|------|---------|---------------------------|
|GET  |/recipe/all| Fetch all recipes  |
|GET  |/recipe/:id| Fetch a recipe by ID |
|(ALL)  |*|  Apply authentication middleware for only the routes listed below (excluding GET ``/recipe/all`` and GET ``/recipe/:id)`` |
|GET  |/recipe| Fetch recipes (with filter, if applicable) |
|POST  |/recipe/addRecipe| Create a new recipe |
|DELETE  |/recipe/:id| Delete a recipe by ID |
|PATCH  |/recipe/:id| Edit a recipe by ID |

\
:rocket: Getting Started - Node.js Server
1. Navigate to the frontend directory:
   
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a .env file and configure the following variables
   ```bash
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your_jwt_secret_here
   ```
5. Start the development server:
    ```bash
    npm run dev
   ```
6. The server will be running on [http://localhost:3000](http://localhost:3000)


