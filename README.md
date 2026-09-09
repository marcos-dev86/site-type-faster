<p align="center">
  <img src="assets/logo-mark.png" alt="Type Faster" width="170">
</p>

<h1 align="center">Type Faster - Site</h1>

<p align="center">
  Site de apresentação do <strong>Type Faster</strong>, um jogo de digitação multiplayer 1x1 em tempo real.
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="Sem frameworks" src="https://img.shields.io/badge/frameworks-nenhum-0f0f0f?style=flat-square">
</p>

---

O site explica como o jogo funciona, detalha a arquitetura por trás dele e disponibiliza o download do APK para Android.

> Projeto de escola desenvolvido com HTML, CSS e JavaScript puros, apresentando um app feito em React Native / Expo.

## Índice

- [Sobre o jogo](#sobre-o-jogo)
- [Estrutura do site](#estrutura-do-site)
- [Arquitetura do projeto completo](#arquitetura-do-projeto-completo)
- [Baixar e jogar](#baixar-e-jogar)
- [Materiais do projeto](#materiais-do-projeto)
- [Tecnologias do site](#tecnologias-do-site)
- [Projetos relacionados](#projetos-relacionados)

## Sobre o jogo

O Type Faster é uma disputa de digitação entre dois jogadores, ao vivo:

- Um jogador cria uma **sala** e recebe um código de 6 letras; o outro entra com esse código.
- A partida dura **60 segundos** e começa para os dois ao mesmo tempo, sincronizada pelo servidor.
- Cada jogador recebe sua **própria palavra** de 5 letras, sorteada separadamente - digitar certo, letra por letra, avança o campo, e uma palavra nova aparece sem repetir nenhuma já usada na partida.
- Quando o tempo zera, quem completou mais palavras vence. Os dois ganham **XP** ao final: vencer rende mais, mas participar já garante experiência.
- O perfil do jogador guarda **nível, taxa de vitória e histórico** das últimas partidas.

## Estrutura do site

| Página | Conteúdo |
|---|---|
| `index.html` | Página inicial, com a proposta do jogo e uma demonstração animada de digitação |
| `como-funciona.html` | As quatro etapas de uma partida, do código da sala ao resultado final, e a explicação de XP/nível/histórico |
| `sobre.html` | Bastidores técnicos: a arquitetura do sistema, o stack e os materiais do projeto |
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
├── assets/
│   ├── logo-mark.png      # marca com fundo transparente, usada no site
│   ├── logo-og.png        # imagem exibida ao compartilhar o link (Open Graph/Twitter)
│   ├── favicon-512.png    # ícone da aba do navegador
│   └── favicon-32.png
└── apk/
    └── Type Faster.apk
```

Site estático, sem build ou dependências - basta abrir `index.html` no navegador ou servir a pasta com qualquer servidor HTTP simples.

## Arquitetura do projeto completo

O site documenta a arquitetura do jogo, que é dividida em três frentes: o app nunca acessa o banco de dados diretamente - toda regra passa pela API, o banco só guarda dado, e o Ably só avisa os celulares quando algo muda.

```
App (Expo, React Native)  →  API (Vercel, serverless)  →  Neon (Postgres)
                                       │
                                       └──────────→  Ably (tempo real)
```

- **React Native + Expo** - o app que roda no celular: telas de sala, digitação e perfil, com um UUID por aparelho salvo via `AsyncStorage` para identificar o jogador.
- **Vercel** - funções serverless em TypeScript (uma rota por arquivo) responsáveis por criar salas, sortear palavras, validar progresso e fechar a partida. É a única parte do sistema com acesso ao banco.
- **Neon (Postgres)** - guarda salas, jogadores dentro de cada sala, perfis (XP, nível, vitórias) e o histórico de partidas encerradas.
- **Ably** - canal em tempo real por sala: avisa quando o adversário entra, quando a partida começa, o placar mudando ao vivo e o resultado final, sem que o app precise ficar consultando o servidor.

O código-fonte da API (rotas, regras de XP/nível e sorteio de palavras, schema do banco) está no repositório [api-type-faster](https://github.com/marcos-dev86/api-type-faster), que também documenta cada rota disponível - como criação e entrada em salas, início e progresso da partida, geração de token do Ably e consulta de perfil/histórico do jogador.

## Baixar e jogar

1. Baixe o `Type-Faster.apk` pela página de [download](download.html) do site.
2. Instale no Android (8.0 ou superior), permitindo "fontes desconhecidas" quando solicitado.
3. Abra o app, escolha um nome e chame alguém para jogar - o Type Faster é multiplayer, então é preciso outro celular com o app aberto para criar ou entrar em uma sala junto com você.

## Materiais do projeto

Pasta com o material usado ao longo do desenvolvimento - o PDF com a primeira ideia/versão do projeto, o arquivo original da logo e o código-fonte do app em React, compactado em `.zip`:

**[Abrir pasta no Google Drive](https://drive.google.com/drive/folders/1Aqp2bYv8Svb1t5zsBb4iybh19tFWcB6-?usp=drive_link)**

## Tecnologias do site

- HTML5 e CSS3 (sem frameworks)
- JavaScript puro (menu responsivo e animação de demonstração no hero)
- Fontes Google (Rajdhani e JetBrains Mono)
- Identidade visual, favicon e imagem de compartilhamento (Open Graph/Twitter) com a logo do projeto

## Projetos relacionados

- [api-type-faster](https://github.com/marcos-dev86/api-type-faster) - API serverless que sustenta o jogo (Vercel + Neon + Ably)

---

<p align="center"><sub>Projeto de escola - Type Faster © 2026</sub></p>
