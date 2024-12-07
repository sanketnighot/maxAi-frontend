import React from 'react';
import { User, Bell, Shield, Wallet } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-[rgb(5,0,255)]" />
            <h2 className="text-lg font-semibold">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Display Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[rgb(5,0,255)]" />
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-[rgb(5,0,255)]" />
              <span>Price Alerts</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-[rgb(5,0,255)]" />
              <span>New Opportunities</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-[rgb(5,0,255)]" />
              <span>Security Alerts</span>
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-[rgb(5,0,255)]" />
            <h2 className="text-lg font-semibold">Security Settings</h2>
          </div>

          <button className="px-4 py-2 bg-[rgb(5,0,255)] text-white rounded-lg hover:bg-blue-600">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}