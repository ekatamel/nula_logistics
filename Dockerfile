# Use an official PHP image as the base image
FROM php:8.2-apache

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the application code into the image
COPY . /var/www/html

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Run composer install to install the PHP dependencies for the Laravel project
RUN composer install --no-dev

# Set the ownership of the /var/www/html directory to the www-data user
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 from the container
EXPOSE 80