#!/bin/sh

KEY=$(openssl rand -hex 32)
IV=$(openssl rand -hex 16)
JWT_SECRET=$(openssl rand -hex 64)

# Replace /path/to/root/folder with the actual path to your project's root folder
sed -i "s/ENCRYPTION_KEY=.*/ENCRYPTION_KEY=${KEY}/" ../.env
sed -i "s/ENCRYPTION_IV=.*/ENCRYPTION_IV=${IV}/" ../.env
sed -i "s/JWT_SECRET=.*/JWT_SECRET=${JWT_SECRET}/" ../.env