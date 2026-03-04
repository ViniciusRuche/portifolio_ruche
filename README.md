# aeroclube-web

Este template deve ajudar você a começar a desenvolver com Vue 3 no Vite.

## Configuração de IDE Recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desative o Vetur).

## Personalizar configuração

Veja [Referência de Configuração do Vite](https://vitejs.dev/config/).

## Configuração do Projeto

```sh
yarn install
```

### Compilar e Hot-Reload para Desenvolvimento

```sh
yarn run dev
```

### Compilar e Minificar para Produção

```sh
yarn run build
```

### Executar Testes Unitários com [Vitest](https://vitest.dev/)

```sh
yarn run test:unit
```

### Lint com [ESLint](https://eslint.org/)

```sh
yarn run lint
```

### Instruções de Deploy

#### Login no Docker

```sh
docker login ghcr.io/carloscalgaro
```

#### Build do Container Docker

```sh
docker build -f .docker/Dockerfile.prod -t ghcr.io/carloscalgaro/aeroclube-web:latest .
```

#### Push para o GitHub Container Registry

```sh
docker ghcr.io/carloscalgaro/aeroclube-web:latest
```

#### Deploy através do Projeto aeroclube-deploy

Siga as instruções no repositório [aeroclube-deploy](https://github.com/seu-usuario/aeroclube-deploy) para fazer o deploy da aplicação.

### Se quiser reverter shadcn

https://github.com/ByteScratchers/aeroclube_web/pull/54/files

### Buscando componentes e dependencias inuteis

```sh
npx unimported
```
