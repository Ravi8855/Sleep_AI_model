# SleepAI - React Frontend

The frontend for SleepAI is built with React and Vite, providing a modern, responsive user interface for sleep tracking and analysis.

## 🏗️ Architecture

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Charts**: Recharts
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd sleep-ai-full-project/sleep-ai-frontend-clean-premium
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
sleep-ai-frontend-clean-premium/
├── src/
│   ├── api/          # API client configuration
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Zustand store
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/           # Static assets
├── index.html        # HTML template
├── vite.config.js    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json      # Project dependencies
```

## 🎨 UI Components

- **Dashboard**: Overview of sleep metrics and trends
- **SleepForm**: Form for logging sleep data
- **TrendsChart**: Interactive chart for sleep trends
- **AdviceCard**: Personalized sleep recommendations
- **NavBar**: Navigation header

## 🌐 API Integration

The frontend communicates with the backend API through the `api/client.js` module, which includes:

- Base URL configuration
- Automatic JWT token attachment
- Error handling

## 🎨 Styling

The application uses Tailwind CSS for styling with custom configurations in `tailwind.config.js`. Custom CSS variables are defined in `src/index.css`.

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📦 Dependencies

Key dependencies include:
- react - UI library
- react-router-dom - Routing
- zustand - State management
- axios - HTTP client
- recharts - Data visualization
- tailwindcss - Utility-first CSS framework
- vite - Build tool

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.
