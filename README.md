# E-Shop - E-Commerce Application

A modern, fully-featured e-commerce web application built with React, TypeScript, and Vite. This project demonstrates best practices in React development including context management, custom hooks, routing, and API integration.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff)

## 🚀 Features

- **Product Catalog**: Browse products from various categories
- **Shopping Cart**: Add/remove items, update quantities with persistent storage
- **User Authentication**: Simulated user login/logout functionality
- **Theme Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first design that works on all devices
- **Product Details**: View detailed information about each product
- **Category Filtering**: Filter products by categories
- **Order Management**: View order history and checkout flow
- **Real-time Updates**: Cart totals and item counts update dynamically

## 📁 Project Structure

```
ecommerce-ts/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout/       # Layout wrapper with Navbar and Footer
│   │   ├── UserProfile/  # User profile card component
│   │   └── css/          # Component-specific CSS modules
│   ├── contexts/         # React Context providers
│   │   ├── CartContext.tsx      # Shopping cart state management
│   │   ├── UserContext.tsx      # User authentication state
│   │   └── ThemeContext.tsx     # Theme (light/dark) management
│   ├── hooks/            # Custom React hooks
│   │   ├── useCart.ts           # Cart operations hook
│   │   ├── useUser.ts           # User operations hook
│   │   └── useProducts.ts       # Product fetching hook
│   ├── pages/            # Page components (routes)
│   │   ├── Home.tsx             # Landing page
│   │   ├── Products.tsx         # Product listing page
│   │   ├── ProductDetail.tsx    # Single product view
│   │   ├── CartPage.tsx         # Shopping cart page
│   │   ├── Checkout.tsx         # Checkout page
│   │   ├── OrderHistory.tsx     # Order history page
│   │   ├── AboutPage.tsx        # About page
│   │   └── ContactPage.tsx      # Contact page
│   ├── styles/           # CSS modules for pages
│   ├── data/             # Mock data and constants
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 🛣️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with featured products and user profile |
| `/products` | Products | Complete product catalog with category filters |
| `/products/:id` | ProductDetail | Detailed view of a single product |
| `/cart` | CartPage | Shopping cart with item management |
| `/checkout` | Checkout | Checkout and payment page |
| `/orders` | OrderHistory | View past orders |
| `/about` | AboutPage | Information about the store |
| `/contact` | ContactPage | Contact form |

## 🔌 API Integration

This application uses the **[Fake Store API](https://fakestoreapi.com)** for product data.

### API Endpoints Used:

- `GET /products` - Fetch all products
- `GET /products/categories` - Fetch all categories
- `GET /products/category/:category` - Fetch products by category
- `GET /products/:id` - Fetch single product details

### Example Usage:

```typescript
// Fetch all products
const response = await fetch('https://fakestoreapi.com/products');
const products = await response.json();

// Fetch by category
const response = await fetch('https://fakestoreapi.com/products/category/electronics');
const electronics = await response.json();
```

## 🎨 Design System

The application uses a comprehensive CSS variable system for consistent theming:

### Color Variables
- `--bg-primary`, `--bg-secondary` - Background colors
- `--text-primary`, `--text-secondary` - Text colors
- `--accent-color` - Primary accent color
- `--success-color`, `--warning-color`, `--danger-color` - Status colors
- `--border-color`, `--card-bg`, `--shadow-color` - UI elements

### Spacing Scale
- `--spacing-xs` through `--spacing-xl` (4px to 32px)

### Border Radius
- `--radius-sm` through `--radius-xl` (4px to 16px)

### Shadows
- `--shadow-sm` through `--shadow-xl`

All CSS variables adapt to the selected theme (light/dark mode).

## 🛠️ Technologies Used

### Frontend
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **React Router DOM 7.10** - Client-side routing
- **React Icons 5.5** - Icon library
- **CSS Modules** - Scoped styling

### Build Tools
- **Vite 7.2** - Build tool and dev server
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎯 Key Features Explained

### Context Management
The app uses React Context API for global state management:
- **CartContext**: Manages shopping cart state, persisted in localStorage
- **UserContext**: Handles user authentication and profile data
- **ThemeContext**: Controls light/dark theme switching

### Custom Hooks
Reusable hooks abstract complex logic:
- **useCart**: Access cart operations (add, remove, update, clear)
- **useUser**: Access user data and authentication methods
- **useProducts**: Fetch and filter products from API

### Local Storage Persistence
- Cart items persist across browser sessions
- User preferences and theme selection saved locally
- Automatic data restoration on page load

### Responsive Design
- Mobile-first CSS architecture
- Breakpoints for tablet and desktop
- Touch-friendly UI elements
- Collapsible mobile navigation

## 🔐 User Authentication

> **Note**: This is a demo application with simulated authentication. No real backend server is used.

Default user credentials are hardcoded for demonstration purposes. In a production app, this would connect to a real authentication API.

## 🛒 Shopping Cart Features

- Add products to cart
- Update item quantities
- Remove items from cart
- Clear entire cart
- Real-time total calculation
- Persistent storage (survives page refresh)
- Visual cart badge showing item count

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder. Deploy this folder to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use `gh-pages` branch
- **Cloudflare Pages**: Connect repository

### Environment Variables

For production deployment, you may want to configure:
- API base URL (if using a different API)
- Analytics tracking IDs
- Feature flags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Product data provided by [Fake Store API](https://fakestoreapi.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy Shopping! 🛍️**
