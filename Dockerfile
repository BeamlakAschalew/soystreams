FROM php:8.3-fpm-alpine

# Install PHP extensions and system dependencies
RUN apk add --no-cache \
    bash \
    libzip-dev \
    zip \
    unzip \
    curl \
    git \
    oniguruma-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    icu-dev \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd intl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]
