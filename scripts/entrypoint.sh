#!/bin/sh

# Gere as chaves e defina as variáveis de ambiente
/bin/sh ./generate-keys.sh

# Carregue as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Inicie o aplicativo
npm run prod
