# Fuel Feed ✍️

![JavaScript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript)
![React](https://img.shields.io/badge/-React-333333?style=flat&logo=react)
[![Appwrite](https://img.shields.io/badge/appwrite-black?logo=appwrite&logoColor=FD366E)](https://appwrite.io)
![React](https://img.shields.io/badge/-TanStack%20Query-F16E29?style=flat&logo=react)
![Shadcn](https://img.shields.io/badge/-Shadcn-000000?style=flat&logo=shadcn&logoColor=white)

---

### **Project Access** ✅

The Project is **Live** at: **[FuelFeed](https://fuel-feed.vercel)**

---

## **FuelFeed ( DoomScroll Antidote )** 🔥

FuelFeed is a social media platform designed to break the cycle of mindless doomscrolling and inspire users to take control of their lives. Unlike traditional platforms that often serve distracting or low-value content, FuelFeed curates a feed centered around self-improvement, motivation, discipline, and purpose.
</br>

The app is built to ignite a spark within users, encouraging them to reflect, take action, and build better habits. To reinforce this mission, FuelFeed limits usage to 45-minute sessions, followed by a mandatory 2-hour cooldown, ensuring users engage intentionally rather than compulsively.
</br>

Inspired by platforms like Facebook in structure, but opposite in philosophy, FuelFeed isn’t about endless scrolling, it’s about fueling the mind, not draining it.

## <span style="color: red;">**FAQ's** 🤔</span>

### 1️⃣. **Why FuelFeed is different from other social media applicatons?**

Most social media platforms are designed to keep users glued to their screens, often leading to hours of doomscrolling and wasted time chasing quick dopamine hits.
</br>
FuelFeed takes a completely different approach:

- Its core mission is to inspire users in a positive way by showing content that sparks motivation and action.
- Only content related to self-improvement, discipline, productivity, and personal growth is allowed.
- No drama. No clickbait. No distractions.
- Just real, uplifting content shared by users who want to grow and help others grow too.

### 2️⃣. **How does FuelFeed monitor the content posted on the feed?**

To maintain the quality and purpose of the platform, FuelFeed includes a **Report Post** feature.

- Users can report posts that don’t match motivational content.
- This helps us quickly identify and take action against particular content.

### 3️⃣. **How is this project different from the previously developed project, **[QuillQuest](https://quill-quest-tau.vercel.app/)**?**

Both projects differ in features and purpose, FuelFeed demonstrates significant improvements in development although.
</br>
Key differences include:

- FuelFeed was developed using only about 32% of the backend requests compared to QuillQuest.
- This shows we’ve gotten better at organizing and streamlining our backend work.
- It reflects improvement in building things in a faster and cleaner way.

## **Key Features 🔑**

- **DoomScroll Antidote:**

  - 45 minute sessions.
  - 2 hour cooldown after each session.
  - 20 minute grace period to rejoin if needed.

- **Full CRUD Operations:**

  - Create, edit, and delete blog posts.
  - Manage user profiles.

- **Like, Save, Share & Report Functionality:**

  - Like posts to show engagement.
  - Save posts for later, like Facebook.
  - Share posts via unique links.
  - Report inappropriate or off-topic content.

- **Authentication:**

  - Secure login/signup via Appwrite Auth.
  - Email-based OTP sign-in.

- **Search with Category Filters:**

  - Search and filter posts by categories.
  - Helps users find relevant content easily.

- **Infinite Scroll Pagination:**

  - Loads more content as user scrolls for smooth browsing.
  - Prevents lag by avoiding bulk content loading.

- **Profile Interface:**

  - View and edit personal info, including bio and photos.
  - Explore other users’ profiles and their posts publicly.

---

## **Major Technologies Used** 💻

**1**. **Frontend:** 🖼️

- React.js + Vite
- Tailwind CSS
- React Router, Redux Toolkit
- Email.js
- Tanstack
- Shadcn

**2**. **Backend Services:** ⚙️

Appwrite (Backend-as-a-Service)

- Authentication
- Database
- Storage

---

## 🛠️ **Getting Started**

### Prerequisites

- React.js version 19.0.0
- Tailwind version 3.4.17
- Appwrite account (free tier sufficient)

## ⚙️ **Installation**

**1**. **Clone the repository:**

```bash
git clone https://github.com/Adil-Shahzad17/FuelFeed
cd FuelFeed
```

**2**. **Install dependencies:** 📥

```bash
npm install
```

Visit the **_package.json_** file to view other dependencies used in this project.

**3**. **Appwrite Setup:** 🧰

- Create a new Appwrite project.
- Set up Authentication.
- Enable Email/Password & Email OTP.

**3a**. **Create Database:** 🛢️

Create a database and 3 collections in it with respective attributes (collection names can differ):

| POST_COLLECTION | USER_COLLECTION | SAVES_COLLECTION |
| --------------- | --------------- | ---------------- |
| user_id         | user_id         | user_id          |
| user_name       | user_ame        | post_id          |
| profile_img     | bio             | content          |
| post_image      | profile_img     | category         |
| category        | cover_img       | post_img         |
| content         | lastSessionTime | profile_img      |
| liked_count     |                 | user_name        |

**B**. **Create Storage with 1 bucket's to store images:** 🌆

Create 1 bucket's for storing images:

- FUEL_BUCKET

Allow jpg, png, JPEG as **Allowed File Extensions** in each bucket settings.

---

### 🚨📢 **Note** :

Remember to set **Permission**. Allow **_Role: Any_** to only read, and **_Role: All Users_** to create, read, update, and delete in both **collection** and **bucket** settings.

---

**4**. **Configure Environment Variables:** </>

- Create .env file in root directory:

```
VITE_APPWRITE_ENDPOINT = project_endpoint
VITE_APPWRITE_PROJECT_ID = project_id
VVITE_APPWRITE_DATABASE = database_id
VITE_APPWRITE_COLLECTION_POST = collection_post_id
VITE_APPWRITE_COLLECTION_USER = collection_user_id
VITE_APPWRITE_COLLECTION_SAVE = collection_save_id
VITE_APPWRITE_BUCKET_FUEL = bucket_fuel_id
VITE_EMAIL_JS_PUBLIC_KEY = email.js_public_key
VITE_EMAIL_JS_SERVICE_ID = email.js_service_id
VITE_EMAIL_JS_TEMPLATE_ID = email.js.template_id
```

**5**. **Run the development server:** ⚡

After installing all the dependencis succesfully and appwrite's configuration it's time to run the project.

```bash
npm run dev
```

---

### 🤝 **Contributing:**

Contributions are **welcome!**
Please follow these steps:

- Fork the project.
- Create your feature branch `git checkout -b feature/AmazingFeature`
- Commit your changes `git commit -m "Add some AmazingFeature"`
- Push to the branch `git push origin feature/AmazingFeature`
- Open a Pull Request.

Please adhere to the **code of conduct**.

---
