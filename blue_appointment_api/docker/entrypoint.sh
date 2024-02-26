#!/usr/bin/env bash

# Install Composer dependencies
composer install -n

# Run Doctrine migrations
bin/console doctrine:migrations:migrate --no-interaction

# Load Doctrine fixtures
# bin/console doctrine:fixtures:load --no-interaction

# Execute the provided command or arguments
exec "$@"
