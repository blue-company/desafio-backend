#!/bin/bash

composer install
php bin/console lexik:jwt:generate-keypair
php bin/console doctrine:database:create
yes | php bin/console doctrine:migrations:migrate
