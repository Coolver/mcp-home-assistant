# 🤖 Настройка автоматической публикации (пошагово)

## 📋 Что уже готово:

✅ GitHub репозиторий создан: https://github.com/Coolver/mcp-home-assistant  
✅ Код запушен на GitHub  
✅ GitHub Actions workflows добавлены:
- `.github/workflows/publish.yml` - автопубликация  
- `.github/workflows/test.yml` - автотесты  

---

## 🎯 Что нужно сделать (3 шага):

```
Шаг 1: NPM → Создать токен
Шаг 2: GitHub → Добавить токен в Secrets
Шаг 3: Тест → Создать релиз
```

---

## 🔐 ШАГ 1: Создать NPM Automation Token

### 1.1 Зарегистрируйтесь на NPM (если еще нет)

Откройте: **https://www.npmjs.com/signup**

Заполните:
- Username: `coolver` (или ваш)
- Email: ваш email
- Password: надежный пароль

Подтвердите email.

### 1.2 Войдите в NPM

Откройте: **https://www.npmjs.com/login**

### 1.3 Создайте Automation Token

1. Откройте: **https://www.npmjs.com/settings/coolver/tokens**
   (замените `coolver` на ваш username)

2. Нажмите **"Generate New Token"** → выберите **"Classic Token"**

3. Выберите тип: **"Automation"** ✅

   **Важно:** Именно **Automation**, не Publish или Read-only!
   
   - ✅ **Automation** - работает в CI/CD без 2FA
   - ❌ **Publish** - требует 2FA при каждом использовании
   - ❌ **Read-only** - не может публиковать

4. Скопируйте токен
   
   Выглядит как: `npm_1a2b3c4d5e6f7g8h9i0j...`

⚠️ **СОХРАНИТЕ ТОКЕН!** Он показывается только один раз.

### 1.4 Визуальная схема:

```
NPM Website (npmjs.com)
    ↓
[Settings] → [Access Tokens]
    ↓
[Generate New Token] → Type: "Automation"
    ↓
[Copy Token]: npm_abc123...
```

---

## 🔑 ШАГ 2: Добавить токен в GitHub Secrets

### 2.1 Откройте настройки Secrets

Перейдите: **https://github.com/Coolver/mcp-home-assistant/settings/secrets/actions**

Или вручную:
1. Откройте: https://github.com/Coolver/mcp-home-assistant
2. Нажмите **"Settings"** (вверху, между Pull requests и Insights)
3. В левом меню: **"Secrets and variables"** → **"Actions"**

### 2.2 Создайте Secret

1. Нажмите **"New repository secret"** (зеленая кнопка справа)

2. Заполните форму:
   ```
   Name: NPM_TOKEN
   
   Secret: npm_1a2b3c4d5e6f7g8h9i0j...
          (вставьте ваш NPM токен)
   ```

3. Нажмите **"Add secret"**

✅ **Готово!** Токен сохранен безопасно.

### 2.3 Визуальная схема:

```
GitHub Repository
    ↓
[Settings] → [Secrets and variables] → [Actions]
    ↓
[New repository secret]
    ↓
Name: NPM_TOKEN
Secret: npm_abc123...
    ↓
[Add secret]
```

### 2.4 Проверка:

После добавления вы увидите:

```
Repository secrets
├── NPM_TOKEN  (Updated now)
```

❌ Значение токена НЕ будет видно (безопасность!)

---

## 🧪 ШАГ 3: Протестировать автопубликацию

### 3.1 Опубликуйте вручную первый раз

```bash
cd /Users/Coolver_1/Projects/smart-home/mcp-home-assistant

# Логин в NPM
npm login

# Публикация
npm publish --access public
```

**Результат:**
```
+ @coolver/mcp-home-assistant@1.0.0
```

### 3.2 Создайте тестовую версию

```bash
# Обновите версию (например 1.0.0 → 1.0.1)
npm version patch

# Это создаст:
# - Commit "1.0.1"
# - Tag "v1.0.1"

# Push изменений И тега
git push && git push --tags
```

### 3.3 Создайте GitHub Release

1. Откройте: https://github.com/Coolver/mcp-home-assistant/releases/new

2. Заполните:
   - **Choose a tag:** `v1.0.1` (выберите из списка)
   - **Release title:** `v1.0.1 - Test release`
   - **Description:**
   ```markdown
   ## What's Changed
   - Testing automated publishing
   
   ## Installation
   ```bash
   npm install -g @coolver/mcp-home-assistant
   ```
   ```

3. Нажмите **"Publish release"**

### 3.4 Наблюдайте за GitHub Actions

1. Сразу после создания релиза откройте: https://github.com/Coolver/mcp-home-assistant/actions

2. Вы увидите:
   ```
   🟡 Publish to NPM
      Running...
   ```

3. Кликните на workflow чтобы смотреть логи в реальном времени

4. Через 1-2 минуты:
   ```
   ✅ Publish to NPM
      Completed successfully
   ```

### 3.5 Проверьте результат

Откройте: https://www.npmjs.com/package/@coolver/mcp-home-assistant

Версия должна обновиться на `1.0.1` ✅

---

## 📊 Как работает автоматизация:

### Workflow Trigger (когда запускается):

```yaml
on:
  release:
    types: [created]    # ← Когда создаете Release
  push:
    tags:
      - 'v*'            # ← Когда пушите тег v1.0.0
```

### Workflow Steps (что делает):

```yaml
steps:
  1. Checkout code          # Скачивает код
  2. Setup Node.js          # Устанавливает Node.js 20
  3. Install dependencies   # npm ci
  4. Build package          # npm run build
  5. Publish to NPM         # npm publish --access public
     Uses: NPM_TOKEN        # ← Использует ваш токен из Secrets
```

---

## 🔄 Полный workflow для обновлений:

```
Вы (локально):
├── 1. Изменили код
├── 2. npm version patch
├── 3. git push && git push --tags
└── 4. Создали Release на GitHub
    
GitHub Actions (автоматически):
├── 5. Запустился workflow
├── 6. Собрал код
├── 7. Опубликовал на NPM
└── ✅ Готово!

Пользователи:
└── npm install -g @coolver/mcp-home-assistant
    (получают новую версию!)
```

---

## 📁 Где находятся workflows:

Файлы уже созданы и запушены:

```
.github/workflows/
├── publish.yml    # Автопубликация на NPM
└── test.yml       # Автотесты при каждом push
```

### publish.yml (автопубликация):

```yaml
name: Publish to NPM

on:
  release:
    types: [created]
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}  # ← Использует ваш токен
```

### test.yml (автотесты):

```yaml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]  # Тестирует на двух версиях Node
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: test -f build/index.js  # Проверяет что сборка прошла
```

---

## ✅ Чеклист настройки:

### Обязательно:
- [ ] Зарегистрированы на NPM
- [ ] Создан **Automation Token** на NPM
- [ ] Токен добавлен в GitHub Secrets как `NPM_TOKEN`
- [ ] Workflows запушены на GitHub (`.github/workflows/`)
- [ ] GitHub Actions включены в репозитории

### Для первой публикации:
- [ ] Вручную опубликовали: `npm publish --access public`
- [ ] Проверили что пакет доступен на NPM

### Для автопубликации:
- [ ] Создали тестовый релиз
- [ ] Проверили что Actions отработал успешно
- [ ] Убедились что новая версия появилась на NPM

---

## 🐛 Проверка настройки:

### Проверьте GitHub Actions включены:

Откройте: https://github.com/Coolver/mcp-home-assistant/settings/actions

Должно быть:
```
✅ Allow all actions and reusable workflows
```

### Проверьте Secret добавлен:

Откройте: https://github.com/Coolver/mcp-home-assistant/settings/secrets/actions

Должны видеть:
```
NPM_TOKEN  (Updated X minutes ago)
```

---

## 🎯 Готово к использованию!

После выполнения всех шагов:

### Для публикации новой версии просто:

```bash
# Обновите версию
npm version patch

# Push
git push && git push --tags

# Создайте Release на GitHub
# (или просто push tag и Actions сработает)
```

**GitHub Actions автоматически опубликует на NPM!** 🎉

### Время автопубликации:

- ⏱️ **~1-2 минуты** от создания Release до публикации на NPM
- 🔄 Полностью автоматически
- 📧 Получите уведомление если что-то пойдет не так

---

## 📺 Мониторинг:

- **Actions:** https://github.com/Coolver/mcp-home-assistant/actions
- **NPM:** https://www.npmjs.com/package/@coolver/mcp-home-assistant
- **Downloads:** https://npm-stat.com/charts.html?package=@coolver/mcp-home-assistant

---

## 💡 Pro Tips:

1. **Используйте Draft Release** для подготовки релиз-нотов
2. **Создавайте Releases** вместо просто тегов (красивее)
3. **Копируйте CHANGELOG** в описание Release
4. **Мониторьте Actions** первые несколько раз

---

**Всё настроено! Начинайте с шага 1** ⬆️

