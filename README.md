# **MySite-React**

http://palkhh.xyz/

---

## CI / CD

### PROD

```bash
docker-compose -f .\docker-compose.prod.yml up --build -d
```

### DEV

```bash
docker compose -f .\docker-compose.dev.yml up --build
```

---

## Архитектура проекта

### Технологический стек
React 19.2 + Vite 7.2
react-router-dom 7.13 (SPA routing)
SCSS/CSS Modules (стилизация)
Docker + Nginx (production deployment)

### Архитектурные особенности
SPA с клиентским роутингом
Кастомный курсор с физикой движения (spring physics)
Компонентная архитектура с forwardRef для императивного управления
Зонная система для курсора (определение элементов под курсором)

### Структура

```angular2html
Neprikosnovenna/
├── src/
│   ├── App.jsx                 # Корневой компонент
│   ├── index.jsx               # Entry point
│   ├── AppRouter.jsx           # Роутинг
│   ├── AppRouter.config.js     # Конфигурация маршрутов
│   ├── index.css               # Глобальные стили
│   ├── components/
│   │   ├── cursor/             # Кастомный курсор
│   │   ├── background/         # Фоновые слои
│   │   ├── button/             # Кнопка
│   │   ├── portrait/           # Портрет (изображение + видео)
│   │   ├── flash/              # Эффект вспышки
│   │   └── HeadController.jsx  # Управление мета-тегами
│   ├── hooks/                  # Глобальные хуки
│   └── pages/                  # Страницы
├── public/
│   ├── images/                 # Изображения (~6.5 MB)
│   ├── videos/                 # Видео (~3.2 MB)
│   └── audio/                  # Аудио (~20 KB)
├── for-docker/
│   └── nginx.conf              # Конфигурация Nginx
├── Dockerfile.prod
├── Dockerfile.dev.react
├── docker-compose.prod.yml
└── docker-compose.dev.yml
```


