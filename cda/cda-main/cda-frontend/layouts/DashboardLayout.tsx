import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar'; // Importe a Sidebar aqui

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar agora integrada */}
      <Sidebar activeTab={activeTab} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeTab={activeTab} />
        
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};