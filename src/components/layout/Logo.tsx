import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <Sparkles className="w-8 h-8 text-primary" />
      <span className="text-xl font-bold">maxAI</span>
    </Link>
  );
}