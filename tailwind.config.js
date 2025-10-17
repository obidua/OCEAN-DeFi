/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#e6f9ff',
          100: '#b3ecff',
          200: '#80dfff',
          300: '#4dd2ff',
          400: '#1ac5ff',
          500: '#00b8e6',
          600: '#0090b3',
          700: '#006880',
          800: '#00404d',
          900: '#00181a',
        },
        neon: {
          blue: '#00f0ff',
          cyan: '#00ffff',
          green: '#39ff14',
          pink: '#ff10f0',
          purple: '#bf00ff',
          orange: '#ff6600',
        },
        dark: {
          950: '#000510',
          900: '#0a0f1e',
          850: '#0f1420',
          800: '#141826',
          700: '#1e2332',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-matrix': 'linear-gradient(to bottom, rgba(0,255,255,0.1), rgba(0,240,255,0.05))',
        'cyber-grid': 'linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '50px 50px',
      },
      boxShadow: {
        'neon-blue': '0 0 8px rgba(0, 240, 255, 0.01), 0 0 12px rgba(0, 240, 255, 0.006)',
        'neon-cyan': '0 0 8px rgba(0, 255, 255, 0.01), 0 0 12px rgba(0, 255, 255, 0.006)',
        'neon-green': '0 0 8px rgba(57, 255, 20, 0.01), 0 0 12px rgba(57, 255, 20, 0.006)',
        'neon-pink': '0 0 8px rgba(255, 16, 240, 0.01), 0 0 12px rgba(255, 16, 240, 0.006)',
        'neon-orange': '0 0 8px rgba(255, 102, 0, 0.01), 0 0 12px rgba(255, 102, 0, 0.006)',
        'cyber': '0 0 10px rgba(0, 240, 255, 0.01), inset 0 0 10px rgba(0, 240, 255, 0.004)',
        'glass': '0 8px 32px 0 rgba(0, 240, 255, 0.006)',
        'inner-glow': 'inset 0 0 8px rgba(0, 240, 255, 0.01)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-in-top': 'slide-in-top 0.6s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'slide-fade-left': 'slide-fade-left 0.7s ease-out',
        'slide-fade-right': 'slide-fade-right 0.7s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0, 240, 255, 0.01)' },
          '50%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.016), 0 0 12px rgba(0, 240, 255, 0.01)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-in-top': {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-fade-left': {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-fade-right': {
          '0%': { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
