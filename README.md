# Network Devices Monitor

Мониторинг сетевых устройств (коммутаторы, OLT, ONT).

## Стек

- Vue 3 + TypeScript
- Tailwind CSS
- Pinia
- Vite
- Docker

## Запуск через Docker

```bash
docker-compose up --build
```

Приложение будет доступно на http://localhost:8081

## Локальная разработка

```bash
npm install
npm run dev
```

## Функционал
- Таблица устройств с сортировкой
- Фильтр по типу и поиск по имени/IP
- Пагинация
- Просмотр и редактирование деталей
- Генерация 100k строк
- Имитация обновления статусов в реальном времени