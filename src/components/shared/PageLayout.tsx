import { type ReactNode }  from "react";
import { Sidebar } from "./Sidebar";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export const PageLayout = ({ children, title, actions }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          {title && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          )}
          <div className="flex items-center gap-4">
            {actions}
            {/* Could add User Avatar here */}
          </div>
        </header>
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
