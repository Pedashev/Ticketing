# 🎫 User Support Helpdesk

A beginner-friendly CRUD application for managing support tickets. Built with Next.js, Supabase, and Tailwind CSS.

## 📋 Features

- ✅ Create new support tickets
- ✅ View all tickets in a grid layout
- ✅ View individual ticket details
- ✅ Edit existing tickets
- ✅ Delete tickets with confirmation
- ✅ Filter tickets by status
- ✅ Modern, responsive UI
- ✅ Real-time status indicators

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Hosting**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great!)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Supabase**
   - Follow the instructions in `SETUP.md`
   - Create your Supabase project
   - Create the `tickets` table (use the SQL script in `supabase-setup.sql`)

3. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Browser**
   - Navigate to `http://localhost:3000`
   - Start creating tickets! 🎉

## 📁 Project Structure

```
user-support-helpdesk/
├── app/                    # Next.js pages and routes
│   ├── api/               # API endpoints
│   ├── tickets/           # Ticket pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── README.md             # This file
```

## 🗄️ Database Schema

The `tickets` table has the following structure:

- `id` (UUID) - Primary key
- `topic` (TEXT) - Ticket title
- `status` (TEXT) - Current status (open, in_progress, resolved, closed)
- `owner` (TEXT) - Ticket owner/assignee
- `problem_description` (TEXT) - Detailed problem description
- `outcome` (TEXT, nullable) - Resolution/outcome
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a learning project! Feel free to experiment and modify it.

## 📝 License

MIT

---

**Happy Coding! 🚀**


