import React from 'react';
import { Brain, Sparkles, TrendingUp, Target } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Brain,
    title: 'Нейропластичность',
    description: 'Мозг способен изменяться на протяжении всей жизни. Наши тренировки стимулируют образование новых нейронных связей.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Sparkles,
    title: 'Память и внимание',
    description: 'Улучшите рабочую память, концентрацию и способность удерживать информацию с помощью специализированных упражнений.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Когнитивная гибкость',
    description: 'Развивайте способность переключаться между задачами и адаптироваться к новым ситуациям эффективнее.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Target,
    title: 'Персонализация',
    description: 'Программа адаптируется под ваш уровень и прогресс, обеспечивая оптимальную нагрузку для максимального результата.',
    color: 'from-blue-500 to-indigo-500',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Что такое{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              когнитивные навыки?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Когнитивные функции — это умственные процессы, которые позволяют нам воспринимать,
            обрабатывать и использовать информацию. Их можно и нужно тренировать.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 h-full hover:border-indigo-500/50 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-indigo-900/30 to-cyan-900/30 border border-indigo-500/30 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl text-white mb-4">
                Научно доказанная эффективность
              </h3>
              <p className="text-slate-300 mb-6">
                Наши методики основаны на последних исследованиях в области нейронауки и
                когнитивной психологии. Регулярные тренировки показывают улучшение
                когнитивных функций уже через 4 недели занятий.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-slate-300">Увеличение объема рабочей памяти на 30%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span className="text-slate-300">Улучшение концентрации внимания на 40%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span className="text-slate-300">Ускорение обработки информации на 25%</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549925245-f20a1bac6454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb3NjaWVuY2UlMjByZXNlYXJjaHxlbnwxfHx8fDE3NjEzOTkzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Neuroscience research"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
