# Desenvolvimento Web II - Todo List

## :hammer: Configuração:

### 1. Criar arquivo `.env` e configurar o banco de dados como o exemplo abaixo.
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=api
DB_USERNAME=postgres
```

### 2. Generate APP_KEY
`php artisan key:generate`

### 3. Migrate
`php artisan migrate`
