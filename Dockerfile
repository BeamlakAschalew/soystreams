# --- PHP Base ---
FROM php:8.2-fpm-alpine AS php_base
ENV APP_ENV=production
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install system dependencies for PHP and common tools
RUN apk add --no-cache \
    curl \
    libzip-dev \
    zip \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    libxml2-dev \
    supervisor \
    git \
    linux-headers

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP extensions
# Ensure this comes AFTER installing system dependencies and Composer if extensions depend on them
# or if composer is used to manage PHP extensions (not typical for docker-php-ext-install)
# Example: RUN docker-php-ext-install pdo_mysql zip bcmath exif pcntl sockets
# Add your specific PHP extensions here based on your project's needs.
# Check your project's composer.json "require" section for php extensions.
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd \
    pdo_mysql \
    bcmath \
    sockets \
    zip \
    exif \
    pcntl \
    mbstring \
    xml \
    dom
# If you use Redis, uncomment and ensure php-redis is installed
# RUN pecl install redis && docker-php-ext-enable redis


WORKDIR /var/www/html

# --- Node.js Frontend Builder ---
FROM node:18-alpine AS frontend_builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if you use one)
# If you don't have pnpm-lock.yaml yet, pnpm will create it on the first install.
COPY package.json ./
# If you have a pnpm-lock.yaml, uncomment the next line
# COPY pnpm-lock.yaml ./

# Install dependencies using pnpm
# pnpm install by default installs devDependencies, which are needed for the build.
# Add --prod if you only want production dependencies, but this will likely break the build step.
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application code
COPY . .

# This command should build your Vite assets as defined in package.json scripts (e.g., "build": "vite build")
RUN pnpm run build

# --- Final Application Stage ---
FROM php_base AS app

# Copy application code
COPY . /var/www/html

# Copy .env.example to .env and ensure APP_KEY is present for build-time commands
# This .env file will be part of the image.
# For production, sensitive values should be injected as environment variables at runtime.
RUN cp .env.example .env && \
    if [ -z "$(grep '^APP_KEY=' .env)" ]; then echo "APP_KEY=" >> .env; fi && \
    if [ "$(grep '^APP_KEY=' .env | cut -d '=' -f2)" = "" ]; then php artisan key:generate --show | awk '{print "APP_KEY="$1}' >> .env.tmp && sed -i '/^APP_KEY=/d' .env && cat .env.tmp >> .env && rm .env.tmp; fi

# For debugging: List files to check if .env is present
RUN ls -la

# Copy built frontend assets from the builder stage
COPY --from=frontend_builder /app/public/build /var/www/html/public/build

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

# Run Laravel-specific commands
# APP_KEY should now be set in the .env for these build-time commands
RUN php artisan wayfinder:generate # As per your vite.config.js
RUN php artisan storage:link       # Creates the public/storage symlink
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Set permissions for Laravel storage and cache
# This runs as root, ensure www-data (PHP-FPM user) can write.
# The fpm pool config usually defines the user as www-data.
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
