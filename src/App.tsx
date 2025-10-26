import React, { useState } from 'react';
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { TaskList } from './components/dashboard/TaskList';
import { AddTaskDialog } from './components/dashboard/AddTaskDialog';
import { Task, TaskStatus } from './types/task';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

// Mock data для демонстрации
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Завершить отчет по проекту',
    description: 'Подготовить ежемесячный отчет для руководства',
    category: 'work',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Купить продукты',
    description: 'Молоко, хлеб, яйца, овощи',
    category: 'shopping',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Тренировка в зале',
    description: 'Силовая тренировка + кардио',
    category: 'health',
    priority: 'medium',
    status: 'completed',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Созвон с командой',
    description: 'Обсудить планы на следующий спринт',
    category: 'work',
    priority: 'high',
    status: 'todo',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Прочитать книгу',
    description: 'Дочитать "Атомные привычки"',
    category: 'personal',
    priority: 'low',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    toast.success('Задача успешно создана!');
  };

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              completedAt: status === 'completed' ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
    
    const statusLabels = {
      todo: 'К выполнению',
      'in-progress': 'В процессе',
      completed: 'Завершена',
    };
    
    toast.success(`Статус изменен на "${statusLabels[status]}"`);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success('Задача удалена');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview tasks={tasks} />;
      case 'tasks':
        return (
          <TaskList
            tasks={tasks}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
          />
        );
      case 'today':
        const todayTasks = tasks.filter((task) => {
          if (!task.dueDate) return false;
          return new Date(task.dueDate).toDateString() === new Date().toDateString();
        });
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl text-white mb-2">Задачи на сегодня</h2>
              <p className="text-slate-400">
                {todayTasks.length} {todayTasks.length === 1 ? 'задача' : 'задач'} запланировано
              </p>
            </div>
            <TaskList
              tasks={todayTasks}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteTask}
            />
          </div>
        );
      case 'calendar':
      case 'stats':
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl text-white mb-2">В разработке</h3>
              <p className="text-slate-400">Этот раздел скоро будет доступен</p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview tasks={tasks} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-white mb-1">
                  {activeView === 'overview' && 'Обзор'}
                  {activeView === 'tasks' && 'Все задачи'}
                  {activeView === 'today' && 'Сегодня'}
                  {activeView === 'calendar' && 'Календарь'}
                  {activeView === 'stats' && 'Статистика'}
                  {activeView === 'settings' && 'Настройки'}
                </h1>
                <p className="text-sm text-slate-400">
                  {new Date().toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <AddTaskDialog onAddTask={handleAddTask} />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 py-8">{renderContent()}</div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
