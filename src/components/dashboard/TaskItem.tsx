import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { 
  Calendar, 
  MoreVertical, 
  Trash2, 
  CheckCircle2,
  Circle,
  Clock,
  Flag
} from 'lucide-react';
import { Task, TaskStatus } from '../../types/task';
import { cn } from '../ui/utils';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  work: 'Работа',
  personal: 'Личное',
  health: 'Здоровье',
  shopping: 'Покупки',
  other: 'Другое',
};

const priorityConfig = {
  low: { label: 'Низкий', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  medium: { label: 'Средний', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  high: { label: 'Высокий', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

const statusConfig = {
  todo: { icon: Circle, color: 'text-slate-400' },
  'in-progress': { icon: Clock, color: 'text-blue-400' },
  completed: { icon: CheckCircle2, color: 'text-green-400' },
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateStatus,
  onDelete,
}) => {
  const StatusIcon = statusConfig[task.status].icon;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const getNextStatus = (): TaskStatus => {
    if (task.status === 'todo') return 'in-progress';
    if (task.status === 'in-progress') return 'completed';
    return 'todo';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Сегодня';
    if (date.toDateString() === tomorrow.toDateString()) return 'Завтра';
    
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <Card
      className={cn(
        'bg-slate-800/50 border-slate-700/50 p-4 hover:border-indigo-500/50 transition-all',
        task.status === 'completed' && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onUpdateStatus(task.id, getNextStatus())}
          className={cn(
            'mt-1 flex-shrink-0 transition-colors',
            statusConfig[task.status].color
          )}
        >
          <StatusIcon className="w-5 h-5" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className={cn(
                'text-white',
                task.status === 'completed' && 'line-through text-slate-500'
              )}
            >
              {task.title}
            </h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                <DropdownMenuItem
                  onClick={() => onUpdateStatus(task.id, 'todo')}
                  className="hover:bg-slate-700"
                >
                  <Circle className="w-4 h-4 mr-2" />
                  К выполнению
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUpdateStatus(task.id, 'in-progress')}
                  className="hover:bg-slate-700"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  В процессе
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUpdateStatus(task.id, 'completed')}
                  className="hover:bg-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Завершить
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="hover:bg-slate-700 text-red-400"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {task.description && (
            <p className="text-sm text-slate-400 mb-3">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
              {categoryLabels[task.category]}
            </Badge>
            
            <Badge className={priorityConfig[task.priority].color}>
              <Flag className="w-3 h-3 mr-1" />
              {priorityConfig[task.priority].label}
            </Badge>

            {task.dueDate && (
              <Badge
                className={cn(
                  'border',
                  isOverdue
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                )}
              >
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(task.dueDate)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
