import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { Task, TaskStatus, TaskCategory } from '../../types/task';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateStatus,
  onDelete,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | TaskCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Priority order
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // Date order
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;

    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white pl-10"
          />
        </div>

        <Select
          value={filterCategory}
          onValueChange={(value: 'all' | TaskCategory) => setFilterCategory(value)}
        >
          <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-white">
            <SelectItem value="all">Все категории</SelectItem>
            <SelectItem value="work">Работа</SelectItem>
            <SelectItem value="personal">Личное</SelectItem>
            <SelectItem value="health">Здоровье</SelectItem>
            <SelectItem value="shopping">Покупки</SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Tabs */}
      <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as 'all' | TaskStatus)}>
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600"
          >
            Все ({tasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="todo"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-yellow-600"
          >
            К выполнению ({tasks.filter((t) => t.status === 'todo').length})
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600"
          >
            В процессе ({tasks.filter((t) => t.status === 'in-progress').length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600"
          >
            Завершено ({tasks.filter((t) => t.status === 'completed').length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Task List */}
      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-400">
              {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'Задачи не найдены'
                : 'У вас пока нет задач'}
            </p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
