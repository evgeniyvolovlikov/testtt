import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { FlaskConical, LineChart, Microscope, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

const scientificData = [
  {
    value: 'research',
    label: 'Исследования',
    icon: FlaskConical,
    title: 'Научная база',
    content: 'Наши методики основаны на работах ведущих нейробиологов и психологов. Мы используем принципы нейропластичности, доказанные в работах Dr. Michael Merzenich и Dr. Norman Doidge.',
    stats: [
      { label: 'Публикаций', value: '150+' },
      { label: 'Университетов', value: '40+' },
      { label: 'Лет исследований', value: '25+' },
    ],
  },
  {
    value: 'methodology',
    label: 'Методология',
    icon: Microscope,
    title: 'Подход к тренировкам',
    content: 'Мы применяем метод интервальных повторений, адаптивную сложность и принцип "зоны ближайшего развития" для максимальной эффективности тренировок.',
    stats: [
      { label: 'Алгоритмов', value: '50+' },
      { label: 'Точность адаптации', value: '98%' },
      { label: 'Типов упражнений', value: '120+' },
    ],
  },
  {
    value: 'results',
    label: 'Результаты',
    icon: LineChart,
    title: 'Доказанная эффективность',
    content: 'Клинические испытания показали значительное улучшение когнитивных функций у 92% пользователей после 8 недель регулярных тренировок.',
    stats: [
      { label: 'Эффективность', value: '92%' },
      { label: 'Улучшение памяти', value: '+35%' },
      { label: 'Рост концентрации', value: '+42%' },
    ],
  },
  {
    value: 'publications',
    label: 'Публикации',
    icon: BookOpen,
    title: 'Научные работы',
    content: 'Результаты наших исследований публикуются в рецензируемых журналах и представляются на международных конференциях по нейронауке.',
    stats: [
      { label: 'Статей', value: '35+' },
      { label: 'Цитирований', value: '500+' },
      { label: 'H-индекс', value: '18' },
    ],
  },
];

export const ScienceSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Наука за{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              нашим подходом
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Каждое упражнение разработано на основе проверенных научных методов
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-slate-800/50 border border-slate-700/50 mb-8">
              {scientificData.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {scientificData.map((item, index) => (
              <TabsContent key={item.value} value={item.value}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-3xl text-white">{item.title}</h3>
                        </div>
                        <p className="text-lg text-slate-300 mb-6">{item.content}</p>
                        <div className="space-y-4">
                          <h4 className="text-slate-400">Ключевые показатели:</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {item.stats.map((stat) => (
                              <div
                                key={stat.label}
                                className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
                              >
                                <div className="text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                                  {stat.value}
                                </div>
                                <div className="text-xs text-slate-400">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="relative h-80 rounded-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1732704573802-8ec393009148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYnJhaW4lMjBzY2llbmNlfGVufDF8fHx8MTc2MTQ4MTU5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Scientific research"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Brain facts grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 border-indigo-500/30 p-6 text-center">
            <div className="text-4xl mb-3">🧠</div>
            <h4 className="text-xl text-white mb-2">86 миллиардов</h4>
            <p className="text-slate-400">нейронов в человеческом мозге</p>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 border-cyan-500/30 p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="text-xl text-white mb-2">100 триллионов</h4>
            <p className="text-slate-400">синаптических соединений</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30 p-6 text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h4 className="text-xl text-white mb-2">До 100 лет</h4>
            <p className="text-slate-400">мозг сохраняет нейропластичность</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
