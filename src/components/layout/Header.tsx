import React from 'react';
import { Wallet2, LayoutDashboard, LineChart, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { ProfileMenu } from './ProfileMenu';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-card/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
                { icon: LineChart, label: 'Analysis', path: '/analysis' },
                { icon: Wallet2, label: 'Wallets', path: '/wallets' },
                // { icon: History, label: 'History', path: '/history' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.path)
                      ? 'bg-primary/10 text-primary dark:text-primary'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 animate-theme-toggle" />
                ) : (
                  <Moon className="w-5 h-5 animate-theme-toggle" />
                )}
              </button>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}