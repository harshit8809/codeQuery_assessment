# 🛍️ E-Commerce React Native App

A modern React Native E-Commerce application built using:

- React Native CLI
- TypeScript
- Redux Toolkit
- RTK Query
- React Navigation

This project demonstrates:
- Authentication flow
- Product listing
- Product details
- Cart management
- Search & filtering
- Optimistic updates
- Clean scalable architecture

---

# ✨ Features

## Authentication
- Login using Fake Store API
- Token storage using AsyncStorage

## Product Listing
- Product grid UI
- Pull to refresh
- Search with debounce
- Category filter
- Empty state handling

## Product Details
- Product information
- Ratings & reviews
- Add to cart functionality

## Cart
- Increase/decrease quantity
- Delete cart item
- Max quantity limit (10)
- Optimistic UI updates
- Grand total calculation

---

# 🧱 Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- RTK Query
- React Navigation
- AsyncStorage
- Lucide React Native

---

# 📂 Project Structure

```txt
src
│
├── assets
├── components
│   ├── cart
│   └── section
│
├── constants
├── hooks
├── navigation
├── redux
│   ├── api
│   ├── slices
│   └── store
│
├── screens
    ├── authScreen
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Install iOS Pods

For iOS only:

```bash
cd ios && pod install && cd ..
```

---

## 4. Start Metro Server

```bash
npm start
```

---

## 5. Run Android App

```bash
npm run android
```

---

## 6. Run iOS App

```bash
npm run ios
```

---

# 🔐 Demo Credentials

Use Fake Store API credentials:

```txt
Username: mor_2314
Password: 83r5^_
```

---

# 📡 APIs Used

Fake Store API:

- Authentication API
- Products API
- Cart API

Base URL:

```txt
https://fakestoreapi.com
```


# 👨‍💻 Author

Developed by Harshit