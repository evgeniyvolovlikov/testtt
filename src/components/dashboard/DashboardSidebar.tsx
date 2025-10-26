import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings,
  ListTodo
} from 'lucide-react';
import { cn } from '../ui/utils';

interface DashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Обзор', icon: LayoutDashboard },
  { id: 'tasks', label: 'Все задачи', icon: ListTodo },
  { id: 'today', label: 'Сегодня', icon: CheckSquare },
  { id: 'calendar', label: 'Календарь', icon: Calendar },
  { id: 'stats', label: 'Статистика', icon: BarChart3 },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">Task Tracker</h1>
            <p className="text-xs text-slate-400">Личный кабинет</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-lg p-4">
          <p className="text-sm text-white mb-2">Продуктивность</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              87%
            </span>
            <span className="text-xs text-slate-400">на этой неделе</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
