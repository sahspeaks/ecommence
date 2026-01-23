# Moonsflare - E-commerce Platform

A modern, responsive e-commerce platform built with React for selling trendy streetwear and anime-inspired fashion items. The application features a complete shopping experience with user authentication, cart management, wishlist functionality, and integrated payment processing.

## 🚀 Features

### Core E-commerce Features

- **Product Catalog**: Browse products by categories and subcategories
- **Product Details**: Detailed product pages with image galleries, size/color selection
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **Wishlist**: Save favorite products for later purchase
- **User Authentication**: Login/signup with email/password and Google OAuth
- **Order Management**: Place orders and track order history
- **Payment Integration**: Razorpay integration for online payments and COD option
- **Search Functionality**: Search products across the catalog
- **Responsive Design**: Mobile-first design with desktop optimization

### User Experience Features

- **Image Gallery**: Interactive product image viewer with touch/swipe support
- **Size Charts**: Product-specific size guides
- **Reviews & Ratings**: Customer review system with star ratings
- **Stock Status**: Real-time stock availability indicators
- **Location Services**: Auto-detect city/state from PIN code
- **Form Validation**: Comprehensive client-side validation
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: User-friendly error messages and fallbacks

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI framework
- **React Router DOM 7.0.2** - Client-side routing
- **Tailwind CSS 3.4.16** - Utility-first CSS framework
- **Vite 6.0.1** - Build tool and development server
- **Framer Motion 11.15.0** - Animation library
- **React Icons 5.5.0** - Icon library
- **Lucide React 0.469.0** - Modern icon set

### Authentication & Payments

- **@react-oauth/google 0.12.2** - Google OAuth integration
- **Razorpay** - Payment gateway integration
- **Axios 1.10.0** - HTTP client for API calls

### UI/UX Libraries

- **React Toastify 11.0.2** - Toast notifications
- **React Context API** - State management

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar/          # Navigation components
│   ├── Buttons/         # Custom button components
│   └── ...
├── context/             # React Context providers
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── CollectionsContext.jsx
│   └── WhislistContext.jsx
├── pages/               # Route components
│   ├── Home.jsx
│   ├── Product.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── ...
├── assets/              # Static assets (images, icons)
├── hooks/               # Custom React hooks
└── server/              # API configuration
```

## 🗺️ Routes & Pages

### Public Routes

- `/` - Home page with hero section and product categories
- `/about` - About page with company information
- `/contact` - Contact page with company details
- `/product/:productId` - Individual product detail page
- `/collection/:categoryName/:subCategoryName` - Category-specific product listings
- `/login` - User login page
- `/signup` - User registration page
- `/privacy` - Privacy policy
- `/return` - Return policy
- `/shipping` - Shipping information
- `/terms` - Terms of service
- `/404` - Not found page

### Protected Routes (Authentication Required)

- `/profile` - User profile management
- `/orders` - Order history and tracking
- `/wishlist` - User's saved products
- `/place-order` - Checkout and payment processing
- `/successPage/:qiKinkOrderId` - Order confirmation page

### Cart Routes

- `/cart` - Shopping cart management

## 🔧 Key Components

### Navigation

- **Navbar**: Main navigation with logo, search, cart, and user menu
- **Topbar**: Secondary navigation menu
- **BottomNavbar**: Mobile navigation bar
- **SearchBar**: Global search functionality

### Product Components

- **ProductItem**: Individual product card component
- **ProductDetail**: Comprehensive product detail view
- **ImageViewModal**: Full-screen image gallery
- **SizeChartModal**: Product size guide
- **ReviewBox**: Customer review display

### Cart & Checkout

- **CartSlider**: Sidebar cart component
- **CartTotal**: Order summary and totals
- **PlaceOrder**: Checkout form with validation

### User Interface

- **Hero**: Landing page hero section
- **CollectionsCategory**: Product category navigation
- **Footer**: Site footer with links and social media
- **Title**: Consistent page title component

## 🔐 Authentication System

### Features

- **Email/Password Authentication**: Traditional login system
- **Google OAuth**: Social login integration
- **Protected Routes**: Route-level authentication guards
- **Session Management**: Token-based authentication with refresh tokens
- **Rate Limiting**: Login attempt protection
- **Secure Storage**: Encrypted local storage for tokens

### User Management

- **Profile Management**: Update personal information and address
- **Order History**: Track past and current orders
- **Wishlist Management**: Save and manage favorite products

## 🛒 Shopping Cart System

### Features

- **Persistent Storage**: Cart data saved in localStorage
- **User-Specific Carts**: Separate carts for different users
- **Anonymous Cart Merging**: Merge guest cart on login
- **Size/Color Variants**: Support for product variations
- **Quantity Management**: Add, remove, and update quantities
- **Real-time Updates**: Instant cart updates across components

### Cart Context Functions

- `addToCart()` - Add items to cart
- `updateQuantity()` - Modify item quantities
- `removeCartItem()` - Remove specific items
- `clearCart()` - Empty the entire cart
- `getCartCount()` - Get total item count
- `getCartAmount()` - Calculate total price

## 💳 Payment Integration

### Payment Methods

- **Online Payment**: Razorpay integration with multiple payment options
- **Cash on Delivery (COD)**: Traditional COD with additional charges
- **Payment Validation**: Server-side payment verification

### Order Processing

- **Order Creation**: Complete order management system
- **Payment Gateway**: Secure payment processing
- **Order Tracking**: Real-time order status updates
- **Email Notifications**: Order confirmation emails

## 📱 Responsive Design

### Mobile-First Approach

- **Mobile Navigation**: Bottom navigation bar for mobile devices
- **Touch Interactions**: Swipe gestures for image galleries
- **Responsive Grids**: Adaptive product grids
- **Mobile Optimizations**: Touch-friendly buttons and forms

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 UI/UX Features

### Visual Design

- **Modern Interface**: Clean, minimalist design
- **Consistent Branding**: Orange color scheme throughout
- **Loading States**: Skeleton loaders and spinners
- **Animations**: Smooth transitions and micro-interactions

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus indicators

## 🔧 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommence

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OAUTH_CLIENT_ID=your_google_oauth_client_id
VITE_API_BASE_URL=your_api_base_url
```

## 📊 State Management

### Context Providers

1. **NewAuthContext**: User authentication and session management
2. **CartContext**: Shopping cart state and operations
3. **CollectionsContext**: Product data and collections
4. **WishlistContext**: Wishlist management

### Data Flow

- **Centralized State**: Context API for global state management
- **Local State**: React hooks for component-specific state
- **Persistent Storage**: localStorage for cart and user preferences

## 🚀 Performance Optimizations

### Code Splitting

- **Route-based Splitting**: Lazy loading of page components
- **Component Optimization**: Memoization and optimization techniques

### Image Optimization

- **Lazy Loading**: Images load as needed
- **Responsive Images**: Different sizes for different devices
- **Compression**: Optimized image formats

### Bundle Optimization

- **Tree Shaking**: Remove unused code
- **Minification**: Compressed production builds
- **Caching**: Browser caching strategies

## 🔒 Security Features

### Authentication Security

- **JWT Tokens**: Secure token-based authentication
- **Token Refresh**: Automatic token renewal
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Client and server-side validation

### Data Protection

- **Secure Storage**: Encrypted localStorage usage
- **HTTPS**: Secure data transmission
- **Input Sanitization**: XSS protection

## 🧪 Testing & Quality

### Code Quality

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **TypeScript Support**: Type checking (dev dependencies)

### Error Handling

- **Global Error Boundaries**: Catch and handle React errors
- **API Error Handling**: Comprehensive error management
- **User Feedback**: Clear error messages and notifications

## 📈 Analytics & Monitoring

### User Analytics

- **Page Tracking**: Route-based analytics
- **User Behavior**: Shopping pattern analysis
- **Performance Monitoring**: Core web vitals tracking

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Container**: Docker deployment

## 🤝 Contributing

### Development Guidelines

1. Follow the existing code style and patterns
2. Write meaningful commit messages
3. Test thoroughly before submitting PRs
4. Update documentation for new features

### Code Structure

- **Components**: Keep components focused and reusable
- **Context**: Use context for global state only
- **Hooks**: Extract reusable logic into custom hooks
- **Styling**: Use Tailwind CSS utility classes

## 📝 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries:

- Email: store.moonsflare@gmail.com
- Instagram: [@moonsflaredotcom](https://instagram.com/moonsflaredotcom)
- Facebook: [@moonsflaredotcom](https://facebook.com/moonsflaredotcom)

---

**Built with ❤️ for streetwear lovers**

Issue: Access and refresh tokens stored in localStorage

- File/Path: src/context/AuthContext.jsx , src/context/NewAuthContext.jsx , src/pages/PlaceOrder.jsx , src/context/WhislistContext.jsx
- Severity: Critical
- Recommendation: Store refresh tokens in secure, httpOnly, sameSite cookies on the backend. Keep access tokens in memory (or sessionStorage with strict CSP/XSS protections). Refactor SecureStorage to avoid localStorage for sensitive tokens.

Issue: Lack of global XSS/Content Security Policy (CSP)

- File/Path: App-level configuration (host-level)
- Severity: Medium
- Recommendation: Add CSP headers via hosting/CDN (restrict script-src to trusted domains like checkout.razorpay.com ), set X-Content-Type-Options: nosniff , Referrer-Policy: no-referrer , and Strict-Transport-Security for production.
  Performance

- Issue: No route-based code splitting

  - File/Path: src/App.jsx
  - Severity: Medium
  - Recommendation: Use React.lazy and Suspense for pages ( Home , Product , Cart , Login , etc.) to reduce initial bundle size.
  - Issue: Redundant data fetching and lack of caching layer

- File/Path: src/context/CollectionsContext.jsx , src/context/sliderService.jsx
- Severity: Low
- Recommendation: Adopt React Query (or SWR) for caching, retries, deduping, stale-while-revalidate. Leverage queryClient and standardized API clients.

- E-Commerce Best Practices

- Issue: Payment integration not fully isolated from UI logic

  - File/Path: src/pages/PlaceOrder.jsx
  - Severity: Medium
  - Recommendation: Abstract payment flow into a dedicated service, standardize error handling and retries. Validate order payload locally before sending.

- Issue: Razorpay script addition without SRI/CSP

  - File/Path: src/pages/PlaceOrder.jsx
  - Severity: Medium
  - Recommendation: Enforce CSP in hosting and load script only from Razorpay; consider deferring load and remove scripts on unmount (already attempted). Ensure secure return flow and signature verification exclusively on backend.

    -Issue: Network error handling inconsistent across modules

    - File/Path: src/context/CollectionsContext.jsx , src/context/WhislistContext.jsx , src/context/sliderService.jsx
    - Severity: Medium
    - Recommendation: Use the apiCall wrapper (with token refresh) consistently or migrate to Axios with interceptors for auth/refresh/error handling. Standardize response parsing and retries.

- Issue: Environment separation incomplete

- File/Path: .env , README.md
- Severity: Medium
- Recommendation: Add .env.development , .env.staging , .env.production with VITE_API_BASE_URL , VITE_OAUTH_CLIENT_ID , VITE_RAZORPAY_KEY_ID . Include .env.example for onboarding.
- Issue: No CI/CD configuration and build checks

- File/Path: Project root
- Severity: Low
- Recommendation: Add CI (GitHub Actions) for lint/build/test on every push. Enforce environment variables presence and generate production build artifacts.
