# Stage 1: Build frontend assets
FROM node:18-alpine AS node_builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Laravel (PHP) setup
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

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Copy built assets from Node stage
COPY --from=node_builder /app/public/build /var/www/public/build

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN adduser -D -g '' www && chown -R www:www /var/www
USER www

CMD ["php-fpm"]
