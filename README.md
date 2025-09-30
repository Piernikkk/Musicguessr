# Musicguessr

<img src="./images/musicguessr_logo.png" alt="logo" height="400px"/>

Guess your friends' favorite music — together!

**This is a game where you and your friends choose your music and guess each other's pick**

## You can play this game [here](https://musicguessr.piernik.rocks)

## Features

-   Joining with game code
    <img src="./images/home.png" alt="home screen"/>
-   Itunes music library
    <img src="./images/search.png" alt="home screen"/>
-   In game chat
    <img src="./images/lobby.png" alt="home screen"/>
    <img src="./images/game.png" alt="home screen"/>
    <img src="./images/reveal.png" alt="home screen"/>

## Development:

### Dependencies:

-   [pnpm](https://pnpm.io/installation)
-   [rust/cargo](https://rust-lang.org/tools/install/)
-   [caddy](https://caddyserver.com/)

### Commands:

```bash
# web
cd web/
pnpm i
pnpm dev

# api
cd ../api/
cargo run

# mixing api and web together on one port
cd ../
caddy run
```
