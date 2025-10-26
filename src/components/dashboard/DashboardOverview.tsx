import React from 'react';
import { Card } from '../ui/card';
import { TaskStats } from './TaskStats';
import { Task } from '../../types/task';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';

interface DashboardOverviewProps {
  tasks: Task[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ tasks }) => {
  const today = new Date().toDateString();
  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toDateString() === today;
  });

  const upcomingTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return dueDate > today && dueDate <= weekFromNow;
  });

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'high' && task.status !== 'completed'
  );

  const completedThisWeek = tasks.filter((task) => {
    if (!task.completedAt) return false;
    const completedDate = new Date(task.completedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return completedDate >= weekAgo;
  }).length;

  const categoryStats = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-white mb-2">Добро пожаловать! 👋</h2>
        <p className="text-slate-400">Вот обзор ваших задач</p>
      </div>

      <TaskStats tasks={tasks} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card className="bg-slate-800/50 border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white">Задачи на сегодня</h3>
              <p className="text-sm text-slate-400">{todayTasks.length} задач</p>
            </div>
          </div>
          <div className="space-y-2">
            {todayTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
              >
                <span className="text-slate-300 text-sm">{task.title}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  task.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : task.status === 'in-progress'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {task.status === 'completed' ? 'Завершено' : task.status === 'in-progress' ? 'В процессе' : 'Ожидает'}
                </span>
              </div>
            ))}
            {todayTasks.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">
                На сегодня задач нет
              </p>
            )}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="bg-slate-800/50 border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white">Предстоящие задачи</h3>
              <p className="text-sm text-slate-400">На этой неделе</p>
            </div>
          </div>
          <div className="space-y-2">
            {upcomingTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
              >
                <span className="text-slate-300 text-sm">{task.title}</span>
                {task.dueDate && (
                  <span className="text-xs text-slate-400">
                    {new Date(task.dueDate).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                )}
              </div>
            ))}
            {upcomingTasks.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">
                Предстоящих задач нет
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30 p-6">
          <h4 className="text-slate-300 text-sm mb-2">Высокий приоритет</h4>
          <div className="text-3xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            {highPriorityTasks.length}
          </div>
          <p className="text-xs text-slate-400 mt-1">Требуют внимания</p>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 p-6">
          <h4 className="text-slate-300 text-sm mb-2">Завершено за неделю</h4>
          <div className="text-3xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {completedThisWeek}
          </div>
          <p className="text-xs text-slate-400 mt-1">Отличная работа! 🎉</p>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30 p-6">
          <h4 className="text-slate-300 text-sm mb-2">Популярная категория</h4>
          <div className="text-3xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {topCategory ? topCategory[0] : '-'}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {topCategory ? `${topCategory[1]} задач` : 'Нет данных'}
          </p>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-slate-800/50 border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white">Прогресс за неделю</h3>
            <p className="text-sm text-slate-400">
              {completedThisWeek} из {tasks.length} задач выполнено
            </p>
          </div>
        </div>
        <Progress
          value={tasks.length > 0 ? (completedThisWeek / tasks.length) * 100 : 0}
          className="h-3 bg-slate-700"
        />
      </Card>
    </div>
  );
};
