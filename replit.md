# Shiva Sadhana - Spiritual E-commerce Platform

## Overview

Shiva Sadhana is a comprehensive spiritual e-commerce platform designed to connect people with India's sacred traditions through products, travel experiences, accommodations, and ritual services. The platform serves as a digital gateway for spiritual seekers to access authentic spiritual items, guided pilgrimages, peaceful accommodations, and traditional ceremonies like Shraddha Kriya and Pind Daan services in Varanasi.

The application follows a modern full-stack architecture with React frontend, Express.js backend, and PostgreSQL database, designed for spiritual commerce and pilgrimage services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React 18 with TypeScript, implementing a component-based architecture using shadcn/ui for consistent design patterns. The application uses Wouter for lightweight client-side routing and TanStack Query for server state management. The UI follows a spiritual theme with custom color schemes (primary: teal-green, secondary: orange) and uses Tailwind CSS for styling with custom CSS variables for theming.

Key frontend architectural decisions:
- **Component Structure**: Modular components with clear separation between UI components (`components/ui/`) and business logic components
- **State Management**: React Query for server state, React Context for authentication and modal management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Modal System**: Centralized modal management through React Context for enquiry, login, and registration modals
- **Authentication**: Client-side authentication with localStorage persistence

### Backend Architecture
The server uses Express.js with TypeScript in ESM format, following RESTful API conventions. The architecture separates concerns through distinct layers for routing, data access, and business logic.

Core backend decisions:
- **API Structure**: RESTful endpoints organized by resource type (products, travels, accommodations, enquiries)
- **Data Layer**: Abstracted storage interface allowing for different implementations (currently using in-memory storage)
- **Authentication**: Simple username/password authentication with role-based access (customer/admin)
- **Error Handling**: Centralized error handling middleware with consistent error responses
- **Development Setup**: Hot reload with Vite integration for seamless development experience

### Data Storage Solutions
The application is configured to use PostgreSQL with Drizzle ORM for type-safe database operations. The schema defines six main entities: users, products, travels, accommodations, shraddha packages, enquiries, and banners.

Database design principles:
- **Schema Design**: Well-normalized tables with proper relationships and constraints
- **Type Safety**: Drizzle-generated TypeScript types ensure compile-time safety
- **Migration Management**: Drizzle Kit for database schema migrations
- **Data Validation**: Zod schemas for runtime validation matching database structure

### Authentication and Authorization
The system implements role-based authentication with two user types: customers and admins. Authentication is handled through simple email/password credentials with session management.

Security considerations:
- **Role Separation**: Clear distinction between customer and admin capabilities
- **Client-side Protection**: Route guards and conditional rendering based on user roles
- **Session Management**: localStorage-based session persistence with logout functionality

### Business Logic Architecture
The application handles four main service categories: spiritual store (products), sacred travel packages, accommodation bookings, and Shraddha Kriya ritual services. Each service type has its own data model and enquiry workflow.

Service architecture decisions:
- **Enquiry System**: Universal enquiry modal that adapts to different service types
- **WhatsApp Integration**: Automated WhatsApp message generation for business communication
- **Search Functionality**: Client-side filtering across all service categories
- **Admin Dashboard**: Comprehensive management interface for all business entities

## External Dependencies

### Database Services
- **NeonDB**: PostgreSQL hosting service for production database
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL operations
- **Drizzle Kit**: Database migration and introspection tools

### UI and Styling
- **shadcn/ui**: React component library built on Radix UI primitives
- **Radix UI**: Low-level UI primitives for accessible component development
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Custom font loading (Poppins, Lora) for spiritual aesthetics

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Plugins**: Development experience enhancements for Replit environment

### Communication Services
- **WhatsApp Business API**: Customer enquiry forwarding through WhatsApp links
- **Toast Notifications**: User feedback system for form submissions and actions

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation