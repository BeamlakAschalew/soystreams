# Stage 1: Build frontend assets using pnpm
FROM node:18-alpine AS node_builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the package manifest
COPY package.json ./

# Install dependencies without lockfile
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the frontend assets (assumes you're using Vite or similar)
RUN pnpm build

# Stage 2: Laravel backend
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    zip \
    unzip \
    curl \
    git \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    shadow \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd intl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy Laravel app
COPY . .

# Copy built frontend assets
COPY --from=node_builder /app/public/build /var/www/public/build

# Install Laravel dependencies (in production mode)
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN adduser -D -g '' www && chown -R www:www /var/www
USER www

CMD ["php-fpm"]
