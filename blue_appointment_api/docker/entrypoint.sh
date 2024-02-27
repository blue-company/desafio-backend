#!/usr/bin/env bash

# Install Composer dependencies
composer install -n

# Wait for 10 seconds
sleep 60

bin/console doctrine:database:create --if-not-exists --no-interaction

# Run Doctrine migrations
bin/console doctrine:migrations:migrate --no-interaction

# Load Doctrine fixtures
# bin/console doctrine:fixtures:load --no-interaction

# Execute the provided command or arguments
exec "$@"
