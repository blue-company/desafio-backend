#!/usr/bin/env bash

# Install Composer dependencies
sleep 20
composer install -n

# Wait for 10 seconds

bin/console doctrine:database:create --if-not-exists --no-interaction

# Run Doctrine migrations
bin/console doctrine:migrations:migrate --no-interaction

# Load Doctrine fixtures
# bin/console doctrine:fixtures:load --no-interaction

# Execute the provided command or arguments
exec "$@"
