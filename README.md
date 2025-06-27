# React Ink Demo - Game of Life

This project demonstrates using [Ink](https://github.com/vadimdemedes/ink) to build command-line interfaces with React components, including JSX and TypeScript support.

Game of Life was implemented to performance test multiple Text and Box components


```
     Game of Life

╭───────────────────────────────────────────────────────────╮
│  ■ ■             ■ ■   ■ ■       ■ ■ ■ ■ ■     ■ ■ ■ ■   ■│
│■ ■                 ■ ■ ■ ■       ■ ■   ■ ■     ■       ■ ■│
│■ ■       ■         ■ ■   ■ ■ ■ ■   ■ ■ ■   ■ ■ ■       ■  │
│  ■ ■     ■         ■   ■       ■ ■   ■ ■ ■     ■ ■ ■ ■ ■ ■│
│■         ■ ■       ■   ■       ■ ■ ■ ■   ■         ■ ■   ■│
│            ■ ■ ■ ■   ■ ■           ■ ■ ■ ■ ■ ■     ■ ■ ■ ■│
│              ■ ■ ■ ■ ■   ■ ■       ■   ■   ■ ■ ■ ■ ■   ■ ■│
│■             ■ ■ ■     ■   ■ ■ ■ ■ ■ ■ ■ ■     ■ ■   ■ ■  │
│■     ■       ■   ■     ■ ■   ■   ■   ■   ■       ■ ■ ■   ■│
│■ ■ ■ ■ ■ ■ ■ ■ ■ ■       ■ ■ ■ ■ ■ ■ ■ ■ ■ ■     ■ ■   ■ ■│
│  ■ ■   ■ ■ ■   ■ ■       ■ ■               ■ ■ ■ ■   ■ ■  │
│  ■ ■ ■ ■   ■ ■ ■ ■       ■ ■                 ■ ■   ■   ■  │
│■ ■     ■ ■   ■   ■       ■ ■                   ■ ■ ■ ■   ■│
│■ ■     ■ ■ ■   ■       ■   ■       ■           ■ ■     ■  │
│        ■     ■ ■       ■ ■       ■ ■         ■ ■ ■     ■ ■│
│        ■     ■   ■ ■ ■ ■ ■       ■ ■         ■   ■ ■ ■   ■│  Generation 19
│■     ■ ■ ■ ■ ■ ■     ■       ■ ■   ■         ■ ■ ■ ■   ■ ■│
│■     ■ ■ ■ ■   ■     ■     ■ ■   ■ ■ ■ ■ ■ ■ ■     ■ ■ ■  │
│■       ■   ■ ■   ■ ■ ■       ■ ■ ■   ■   ■ ■       ■ ■ ■ ■│
│  ■     ■ ■ ■   ■     ■       ■ ■   ■ ■ ■ ■       ■ ■     ■│
│■ ■     ■   ■ ■ ■     ■     ■ ■   ■ ■   ■ ■       ■ ■     ■│
│      ■   ■ ■     ■ ■ ■     ■   ■ ■ ■ ■ ■   ■     ■ ■      │
│      ■ ■     ■ ■   ■ ■     ■ ■ ■         ■ ■     ■ ■      │
│              ■ ■ ■   ■ ■ ■ ■             ■ ■ ■ ■ ■   ■ ■  │
│  ■ ■ ■     ■ ■   ■ ■ ■   ■                     ■ ■ ■   ■  │
│  ■ ■   ■ ■ ■   ■ ■ ■   ■ ■         ■ ■             ■ ■    │
│  ■   ■   ■   ■ ■   ■ ■ ■ ■       ■                        │
│  ■ ■ ■ ■   ■ ■   ■ ■ ■   ■ ■ ■ ■ ■                        │
│  ■ ■   ■ ■ ■ ■ ■ ■   ■ ■   ■ ■ ■                          │
│■   ■ ■ ■ ■       ■ ■ ■   ■                         ■ ■ ■ ■│
╰───────────────────────────────────────────────────────────╯

Enter grid size (10-50) ❯ 30 
Press Enter to submit, ctr-c to exit

```

## Features

- React-style CLI components with Ink
- JSX and TypeScript support
- Double-buffered drawing example using ArrayBuffers

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

```sh
npm install
```

### Development

Run the app:

```sh
npx tsx src/cli.tsx
```

## License

MIT