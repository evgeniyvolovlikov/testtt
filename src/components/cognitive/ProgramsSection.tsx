import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, Users, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const programs = [
  {
    title: 'Базовый курс',
    subtitle: 'Начальный уровень',
    duration: '4 недели',
    sessions: '15 минут в день',
    users: '25K+',
    color: 'from-indigo-500 to-purple-500',
    features: [
      'Тренировка рабочей памяти',
      'Развитие концентрации',
      'Базовые логические задачи',
      'Ежедневная статистика',
    ],
    badge: 'Популярный',
  },
  {
    title: 'Продвинутый курс',
    subtitle: 'Средний уровень',
    duration: '8 недель',
    sessions: '25 минут в день',
    users: '15K+',
    color: 'from-cyan-500 to-blue-500',
    features: [
      'Комплексные упражнения',
      'Многозадачность',
      'Скорость обработки информации',
      'Персональный трекинг',
      'Адаптивная сложность',
    ],
    badge: 'Рекомендуем',
  },
  {
    title: 'Профессиональный',
    subtitle: 'Экспертный уровень',
    duration: '12 недель',
    sessions: '40 минут в день',
    users: '8K+',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Все упражнения платформы',
      'Интенсивные тренировки',
      'Экспертная аналитика',
      'Сертификация прогресса',
      'Индивидуальный план',
      'Приоритетная поддержка',
    ],
    badge: 'Premium',
  },
];

export const ProgramsSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Выберите свою{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              программу тренировок
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Каждая программа разработана для достижения максимальных результатов
            в развитии когнитивных способностей
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="relative bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 h-full hover:border-indigo-500/50 transition-all duration-300 overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge className={`bg-gradient-to-r ${program.color} border-0 text-white`}>
                      {program.badge}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl text-white mb-2">{program.title}</h3>
                  <p className="text-slate-400 mb-6">{program.subtitle}</p>

                  {/* Info cards */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="w-5 h-5 text-indigo-400" />
                      <span>{program.duration} • {program.sessions}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span>{program.users} активных пользователей</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 pt-6 border-t border-slate-700">
                    {program.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90 text-white border-0`}
                  >
                    Начать программу
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-4">
            Не уверены, какая программа подходит вам?
          </p>
          <Button
            variant="outline"
            className="border-indigo-400/50 text-white hover:bg-indigo-500/10"
          >
            Пройти тест на определение уровня
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
