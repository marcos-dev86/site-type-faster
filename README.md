# Type Faster — Site

Site de apresentação do **Type Faster**, um jogo de digitação multiplayer 1x1 em tempo real. O site explica como o jogo funciona, detalha a arquitetura por trás dele e disponibiliza o download do APK para Android.

> Projeto de escola desenvolvido com HTML, CSS e JavaScript puros, apresentando um app feito em React Native / Expo.

## Sobre o jogo

O Type Faster é uma disputa de digitação entre dois jogadores, ao vivo:

- Um jogador cria uma **sala** e recebe um código de 6 letras; o outro entra com esse código.
- A partida dura **60 segundos** e começa para os dois ao mesmo tempo, sincronizada pelo servidor.
- Cada jogador recebe sua **própria palavra** de 5 letras, sorteada separadamente — digitar certo, letra por letra, avança o campo, e uma palavra nova aparece sem repetir nenhuma já usada na partida.
- Quando o tempo zera, quem completou mais palavras vence. Os dois ganham **XP** ao final: vencer rende mais, mas participar já garante experiência.
- O perfil do jogador guarda **nível, taxa de vitória e histórico** das últimas partidas.

## Estrutura do site

| Página | Conteúdo |
|---|---|
| `index.html` | Página inicial, com a proposta do jogo e uma demonstração animada de digitação |
| `como-funciona.html` | As quatro etapas de uma partida, do código da sala ao resultado final, e a explicação de XP/nível/histórico |
| `sobre.html` | Bastidores técnicos: a arquitetura do sistema e o papel de cada peça do stack |
| `download.html` | Download do `Type-Faster.apk` e passo a passo de instalação no Android |

```
site-type-faster/
├── index.html
├── como-funciona.html
├── sobre.html
├── download.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── apk/
    └── Type Faster.apk
```

Site estático, sem build ou dependências — basta abrir `index.html` no navegador ou servir a pasta com qualquer servidor HTTP simples.

## Arquitetura do projeto completo

O site documenta a arquitetura do jogo, que é dividida em três frentes: o app nunca acessa o banco de dados diretamente — toda regra passa pela API, o banco só guarda dado, e o Ably só avisa os celulares quando algo muda.

```
App (Expo, React Native)  →  API (Vercel, serverless)  →  Neon (Postgres)
                                       │
                                       └──────────→  Ably (tempo real)
```

- **React Native + Expo** — o app que roda no celular: telas de sala, digitação e perfil, com um UUID por aparelho salvo via `AsyncStorage` para identificar o jogador.
- **Vercel** — funções serverless em TypeScript (uma rota por arquivo) responsáveis por criar salas, sortear palavras, validar progresso e fechar a partida. É a única parte do sistema com acesso ao banco.
- **Neon (Postgres)** — guarda salas, jogadores dentro de cada sala, perfis (XP, nível, vitórias) e o histórico de partidas encerradas.
- **Ably** — canal em tempo real por sala: avisa quando o adversário entra, quando a partida começa, o placar mudando ao vivo e o resultado final, sem que o app precise ficar consultando o servidor.

O código-fonte da API (rotas, regras de XP/nível e sorteio de palavras, schema do banco) está no repositório [api-type-faster](https://github.com/marcos-dev86/api-type-faster), que também documenta cada rota disponível — como criação e entrada em salas, início e progresso da partida, geração de token do Ably e consulta de perfil/histórico do jogador.

## Baixar e jogar

1. Baixe o `Type-Faster.apk` pela página de [download](download.html) do site.
2. Instale no Android (8.0 ou superior), permitindo "fontes desconhecidas" quando solicitado.
3. Abra o app, escolha um nome e chame alguém para jogar — o Type Faster é multiplayer, então é preciso outro celular com o app aberto para criar ou entrar em uma sala junto com você.

## Tecnologias do site

- HTML5 e CSS3 (sem frameworks)
- JavaScript puro (menu responsivo e animação de demonstração no hero)
- Fontes Google (Rajdhani e JetBrains Mono)

## Projetos relacionados

- [api-type-faster](https://github.com/marcos-dev86/api-type-faster) — API serverless que sustenta o jogo (Vercel + Neon + Ably)
