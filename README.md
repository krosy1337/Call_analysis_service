# Call_analysis_service

## Для запуска проекта требуется установить:
- Node.js:   https://nodejs.org/en
- Python:    https://www.python.org/downloads/
- Git:       https://git-scm.com/

## Конфигурация
Запускаем командную строку, прописываем команды:
1. Сохранение никнейма 'git config --global user.name "your_username"'
2. Сохранение адреса почты 'git config --global user.email "your_email_address@example.com"'

## Клонирование проекта
В командной строке прописываем команду 'git clone  https://github.com/krosy1337/Call_analysis_service'
Появится папка с проектом, переходим к созданной директории в командной строке с помощью команды 'cd C:\...\Call_analysis_service'

## Запуск
1. Переходим к папке client 'cd C:\...\Call_analysis_service\client' и прописываем 'npm i' для скачивания модулей Node.js
2. Переходим к папке server 'cd C:\...\Call_analysis_service\server' и прописываем 'python -m venv venv' для создания виртуального окружения.
Далее активируем виртуальное окружение с помощью команды 'venv\Scripts\activate.bat' и прописываем 'pip install -r requirements.txt' для
скачивания модулей Python.
3. Далее нужно запустить вторую командную  строку и перейти на ней снова к папке client 'cd C:\...\Call_analysis_service\client'
4. На первой командной строке (которая работает в директории server) прописываем 'flsite.py' для запсука серверной части
5. На второй командной строке (работающей в директории client) прописываем 'npm start' для запуска клиентской части. Веб-приложение
автоматически запсукается через браузер и готов для тестирования пользователем.
