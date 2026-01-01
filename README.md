# 🧹 CleanCity -- Client Side (Frontend)

The **CleanCity Client** is a modern web application that empowers
communities to report, track, and resolve environmental issues
collaboratively.\
It's built using **React**, **Firebase**, **TailwindCSS**, and
**DaisyUI** --- combining performance with a beautiful and responsive
user interface.

------------------------------------------------------------------------------

## 🌐 Live Website

👉 <https://cleancity-ashiqur.netlify.app/>

------------------------------------------------------------------------

## ⚙️ Tech Stack

  Technology                       Purpose
  -------------------------------- -----------------------------------------
  ⚛️ **React.js**                  Frontend library for building the UI
  🧭 **React Router DOM**          For navigation and route management
  🔥 **Firebase Authentication**   For secure user login/register
  🎨 **Tailwind CSS**              Utility-first CSS framework for styling
  💎 **DaisyUI**                   Tailwind-based UI component library
  🧠 **Lucide Icons**              Modern and consistent icon set
  🪄 **Lottie React**              Animated illustrations for enhanced UX
  💬 **React Hot Toast**           User notifications and alerts
  🧾 **SweetAlert2**               Elegant confirmation modals
  ✍️ **React Simple Typewriter**   Typing animations for headings
  🌙 **Dark/Light Theme**          Fully functional theme toggle

------------------------------------------------------------------------

## 🚀 Core Features

✅ **User Authentication:**\
- Register and login using Firebase\
- Auto-detects logged-in users and personalizes dashboard

✅ **Issue Management:**\
- Add, edit, delete and view community issues\
- Filter issues by **status** or **category**\
- Upload images and set location, amount, and details

✅ **Dynamic Dashboard:**\
- "My Issues" page for user-specific reports\
- "My Contribution" page for tracking cleanup donations

✅ **Interactive UI:**\
- Hero banner with slider and animation\
- Category cards with Lottie animations\
- Typewriter text and Lucide icons integration\
- Fully responsive for mobile, tablet, and desktop

✅ **Theme Mode:**\
- Modern Dark/Light theme toggle with persistence

✅ **Error Handling:**\
- Custom 404 page with animation (Lottie integration)

------------------------------------------------------------------------

## 🧩 Environment Setup

Create a `.env` file in the project root with your credentials:

``` bash
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_API_URL=https://cleancity-server.vercel.app
```

------------------------------------------------------------------------

## ▶️ Run Locally

``` bash
# Clone the repository
git clone https://github.com/your-username/CleanCity-client.git

# Go to project directory
cd CleanCity-client

# Install dependencies
npm install

# Run the app
npm run dev
```

Your app will start on\
👉 `http://localhost:5173`

------------------------------------------------------------------------

## 📁 Folder Structure

    CleanCity-client/
    │
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Home/
    │   │   ├── Issues/
    │   │   ├── AddIssues/
    │   │   ├── MyIssues/
    │   │   ├── MyContribution/
    │   │   ├── Error/
    │   ├── Provider/
    │   │   └── AuthProvider.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │
    ├── public/
    ├── .env
    └── package.json

------------------------------------------------------------------------

## 🧠 Future Improvements

-   Add Google Maps API for live location tagging\
-   Enable social login (Google/Facebook)\
-   Add Admin Dashboard for moderation\
-   Improve accessibility (A11y)

------------------------------------------------------------------------

## 🧑‍💻 Developer

**👨‍💻 Ashikur Rahman (HackA.R101)**\
📧 Email: your@email.com\
🔗 LinkedIn:
[linkedin.com/in/ashqrrhmn](https://www.linkedin.com/in/ashqrrhmn/)\
🐦 Twitter (X): [@ashqrrmn](https://x.com/ashqrrmn)\
📸 Instagram:
[instagram.com/\_ashqrrmn](https://instagram.com/_ashqrrmn)

------------------------------------------------------------------------

✅ *"Together we can make our city cleaner, greener, and smarter!"* 🌱
