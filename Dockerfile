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
    oniguruma-dev \   # for mbstring \
    libxml2-dev \     # for xml/dom \
    supervisor \
    git               # For composer dependencies from VCS if needed

# Install PHP extensions
WORKDIR /var/www/html

# --- Node.js Frontend Builder ---
FROM node:18-alpine AS frontend_builder
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install npm dependencies using npm install
RUN npm install --only=production --no-audit --no-fund

# Copy the rest of the application code
COPY . .

# This command should build your Vite assets as defined in package.json scripts (e.g., "build": "vite build")
RUN npm run build

# --- Final Application Stage ---
FROM php_base AS app

# Copy application code
COPY . /var/www/html

# Copy built frontend assets from the builder stage
COPY --from=frontend_builder /app/public/build /var/www/html/public/build

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

# Run Laravel-specific commands
# Ensure APP_KEY is set in your .env file or passed via docker-compose environment.
# Avoid running key:generate directly in the Dockerfile if APP_KEY is managed externally.
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
