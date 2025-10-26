import React from 'react';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Separator } from '../ui/separator';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-white">CognitiveBrain</span>
            </div>
            <p className="text-slate-400 mb-4">
              Инновационная платформа для развития когнитивных навыков на основе научных исследований.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white mb-4">Программы</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Базовый курс
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Продвинутый курс
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Профессиональный
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Корпоративные решения
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white mb-4">Ресурсы</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Научная база
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Поддержка
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-400">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-400" />
                <span>info@cognitivebrain.com</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-400" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-400" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© 2025 CognitiveBrain. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Условия использования
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
