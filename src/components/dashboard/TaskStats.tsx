import React from 'react';
import { Card } from '../ui/card';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Выполнено',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-900/30 to-emerald-900/30',
      borderColor: 'border-green-500/30',
    },
    {
      label: 'В процессе',
      value: inProgressTasks,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-900/30 to-cyan-900/30',
      borderColor: 'border-blue-500/30',
    },
    {
      label: 'Запланировано',
      value: todoTasks,
      icon: AlertCircle,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-900/30 to-yellow-900/30',
      borderColor: 'border-orange-500/30',
    },
    {
      label: 'Прогресс',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-900/30 to-pink-900/30',
      borderColor: 'border-purple-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card
            key={stat.label}
            className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} p-6`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </Card>
        );
      })}
    </div>
  );
};
