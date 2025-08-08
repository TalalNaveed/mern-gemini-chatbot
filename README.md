# Tyntex - AI-Driven Digital Solutions

Tyntex is a modern web application showcasing our comprehensive digital services including AI automation, data analytics, cloud solutions, and full stack development. Built with Next.js and powered by Supabase for robust backend functionality.

## 🚀 Features

- **AI Automation**: Intelligent automation solutions with MVP development, process automation, chatbots, and predictive analytics
- **Data Analytics & Insights**: Business intelligence, machine learning models, data visualization, and real-time analytics
- **Cloud Solutions**: Cloud migration, SaaS development, DevOps & CI/CD, and infrastructure management
- **Full Stack Development**: Frontend development, backend services, mobile apps, and e-commerce solutions
- **Contact Management**: Form submissions with database storage and email notifications
- **Newsletter System**: Email subscription management with duplicate handling

## 🛠️ Built With

- **Next.js 15.3.3** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Primitive component library
- **Lucide React** - Beautiful icon library
- **Supabase** - PostgreSQL backend with real-time features
- **Zod** - Schema validation for API endpoints

## 🎨 Key Components

- **Interactive Orbital Timeline**: Dynamic service showcases with animations
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **3D Effects**: Tilt effects and interactive animations
- **Gradient Animations**: Shiny text effects and smooth transitions
- **Form Handling**: Contact forms and newsletter subscriptions with validation
- **Database Integration**: PostgreSQL backend with Row Level Security

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form endpoint
│   │   ├── newsletter/    # Newsletter subscription endpoint
│   │   └── projects/      # Projects data endpoint
│   ├── services/          # Service category pages
│   │   ├── ai-automation/
│   │   ├── data-analytics/
│   │   ├── cloud-solutions/
│   │   └── web-app-development/
│   ├── about/             # About us page
│   ├── contact/           # Contact page
│   └── projects/          # Projects showcase
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── sections/         # Page sections
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   └── icons/            # Custom icons
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and Supabase config
└── supabase/             # Database migrations and setup
    └── migrations/       # SQL migration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Supabase account (for backend functionality)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd tyntex
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   ```

4. Configure Supabase
   - Create a new Supabase project
   - Get your project URL and API keys
   - Update `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. Set up the database
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migration scripts from `supabase/migrations/`

6. Run the development server
   ```bash
   npm run dev
   ```

7. Open [http://localhost:9002](http://localhost:9002) in your browser

### Database Setup

1. **Run Initial Schema Migration**:
   ```sql
   -- Copy and paste the contents of supabase/migrations/001_initial_schema.sql
   -- This creates all necessary tables and indexes
   ```

2. **Add Sample Data** (Optional):
   ```sql
   -- Copy and paste the contents of supabase/migrations/002_sample_data.sql
   -- This adds sample projects and services data
   ```

### Build for Production

```bash
npm run build
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## 🎯 Key Features

### Interactive Service Pages
Each service category has its own dedicated page with:
- Hero section with animated backgrounds
- Service overview cards
- Interactive orbital timeline
- Process workflows
- Call-to-action sections

### Backend Functionality
- **Contact Form**: Saves inquiries to PostgreSQL database
- **Newsletter System**: Email subscription management
- **API Routes**: RESTful endpoints with validation
- **Database Security**: Row Level Security (RLS) policies
- **Error Handling**: Comprehensive validation and error messages

### Modern UI/UX
- Black and white minimalistic design
- Smooth animations and transitions
- Responsive across all devices
- Accessible components
- Form validation with real-time feedback

### Performance Optimized
- Static generation where possible
- Optimized images and assets
- Efficient bundle splitting
- Fast loading times
- Database query optimization

## 🗄️ Database Schema

### Tables
- **contacts**: Contact form submissions
- **newsletter_subscribers**: Email subscriptions
- **projects**: Portfolio projects
- **services**: Service offerings

### Security
- Row Level Security (RLS) enabled
- Public insert policies for forms
- Authenticated read policies for admin data

## 🌐 Live Demo

Visit our website: [tyntex.com](https://tyntex.com)

## 🤝 Contributing

This is a proprietary project for Tyntex. For internal development inquiries, please contact the development team.

## 📧 Contact

- **Email**: info@tyntex.com
- **Website**: [tyntex.com](https://tyntex.com)

## 👥 Team

Founded and developed by:
- **Abdullah Sajid** - Co-Founder & Full-Stack Developer
- **Asad Shahab** - Co-Founder & AI/ML Engineer  
- **Talal Naveed** - Co-Founder & Cloud Solutions Architect

---

© 2024 Tyntex. All rights reserved.
