# Full Stack Development Lab Report
**Project Title**: Customer Feedback & Review System
**Date**: April 29, 2026

## 1. Project Objective
The objective of this project was to design, develop, and deploy a full-stack web application that allows users to submit product/service feedback, view aggregate ratings, and enables administrators to manage (delete) inappropriate reviews. The application is built to be production-ready and deployed on Vercel.

## 2. Technologies Used
* **Frontend**: Next.js 16 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS integration for responsive and modern UI
* **Backend**: Next.js Serverless API Routes
* **Database**: PostgreSQL (hosted on Vercel/Neon) with `@vercel/postgres`
* **Deployment**: Vercel

## 3. System Architecture & Design
The project follows a modern Serverless architecture using Next.js.
* **Client-Side (UI)**: Built with React Server Components and Client Components (`use client`). It includes a `FeedbackForm` with an interactive, accessible 5-star rating system and a `FeedbackList` that calculates and displays the average rating.
* **Server-Side (API)**: Next.js Route Handlers (`app/api/feedback/route.ts`) expose RESTful endpoints (`GET`, `POST`, `DELETE`).
* **Database Layer**: Directly interfaces with a remote PostgreSQL database to ensure data persistence across serverless function invocations (which is required by platforms like Vercel with ephemeral file systems).

## 4. Implementation Details
### 4.1 Database Schema
A PostgreSQL table named `feedback` was created to store reviews:
```sql
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 API Endpoints
* **`GET /api/feedback`**: Fetches all feedback entries from the database, ordered by newest first.
* **`POST /api/feedback`**: Validates incoming payload (name, rating between 1-5, comment) and inserts it into the database.
* **`DELETE /api/feedback/:id`**: Secure endpoint used in the Admin dashboard to delete specific reviews based on their ID.

### 4.3 User Interface
* **Public Portal**: Contains the submission form and a list of recent reviews. Features real-time state updates upon submission.
* **Admin Dashboard**: A separate route (`/admin`) that renders the feedback list with additional privileges (Delete buttons).

## 5. Challenges and Solutions
1. **Database Selection & Build Compatibility**: Initial attempts utilized Prisma with SQLite. However, due to Next.js Turbopack caching issues and Vercel's ephemeral filesystem (which cannot permanently host a local `.db` file), the architecture was refactored. 
   * *Solution*: Migrated to a cloud-hosted PostgreSQL database (Neon/Vercel Postgres) utilizing the lightweight `@vercel/postgres` client, guaranteeing scalability and deployment compatibility.
2. **Accessible Form Inputs**: The custom star-rating component initially suffered from click-registration bugs.
   * *Solution*: It was rebuilt using a hidden radio-button group wrapped in styled `label` elements. This ensured full browser compatibility, proper ARIA accessibility (`role="radiogroup"`), and keyboard navigation support.

## 6. Conclusion
The Customer Feedback Portal was successfully implemented as a full-stack application. It demonstrates core CRUD operations, responsive design patterns using Tailwind CSS, and modern serverless database integration using Vercel Postgres. The application is robust, handles state management gracefully, and easily scales for production deployment.
