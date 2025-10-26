import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Свяжитесь{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              с нами
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Есть вопросы о когнитивных тренировках? Мы готовы помочь!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">
                    Сообщение
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите, чем мы можем помочь..."
                    rows={5}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0"
                >
                  Отправить сообщение
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl text-white mb-6">Контактная информация</h3>
              <div className="space-y-4">
                <Card className="bg-slate-800/30 border-slate-700/50 p-6 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">Email</h4>
                      <p className="text-slate-400">info@cognitivebrain.com</p>
                      <p className="text-slate-400">support@cognitivebrain.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50 p-6 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">Телефон</h4>
                      <p className="text-slate-400">+7 (495) 123-45-67</p>
                      <p className="text-slate-400">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50 p-6 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">Адрес</h4>
                      <p className="text-slate-400">г. Москва, ул. Примерная, д. 123</p>
                      <p className="text-slate-400">БЦ "Когнитивный", 5 этаж</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-indigo-900/30 to-cyan-900/30 border-indigo-500/30 p-8">
              <h4 className="text-xl text-white mb-4">Часы работы</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница</span>
                  <span className="text-indigo-400">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span className="text-indigo-400">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье</span>
                  <span className="text-slate-500">Выходной</span>
                </div>
              </div>
            </Card>

            <div className="relative h-64 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1752243744717-c308a6e97922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2duaXRpdmUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjE0ODE1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cognitive training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
