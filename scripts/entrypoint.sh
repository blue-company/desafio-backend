#!/bin/sh

# Gere as chaves e defina as variáveis de ambiente
/bin/sh ./scripts/generate-keys.sh


# Carregue as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Inicie o aplicativo
npm run prod
