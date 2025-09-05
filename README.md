# Monty Hall Problem Game

An interactive React application that demonstrates the famous Monty Hall probability problem.

## Features

- **Interactive Game**: Click cards to play the Monty Hall problem
- **Statistics Tracking**: See win rates for stay vs switch strategies
- **Auto Play**: Run automated simulations to test strategies
- **Educational**: Learn why switching gives you a 67% win rate

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required for Vite)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Testing

This project uses Playwright for end-to-end testing.

**Note**: Due to Node.js version requirements, you may need to upgrade Node.js to run the dev server automatically with tests.

#### Manual Testing Setup

1. Start the dev server manually:
   ```bash
   npm run dev
   ```

2. In another terminal, run the tests:
   ```bash
   npm run test
   ```

#### Test Commands

- `npm run test` - Run all tests
- `npm run test:ui` - Run tests with UI mode
- `npm run test:headed` - Run tests in headed mode (see browser)

## How to Play

1. **Choose a Card**: Click any of the three cards to make your initial choice
2. **Host Reveals**: The host will reveal a goat behind one of the other cards
3. **Make Your Decision**: Choose to stay with your original choice or switch to the remaining card
4. **See Results**: Find out if you won or lost, and see the statistics update

## The Monty Hall Problem

The Monty Hall problem is a probability puzzle based on the American television game show "Let's Make a Deal". The key insight is that switching your choice after the host reveals a goat gives you a 2/3 (67%) chance of winning, while staying gives you only a 1/3 (33%) chance.

### Why Switching Works

- Initially, you have a 1/3 chance of picking the correct door
- The host always reveals a goat from the remaining doors
- When you switch, you're essentially choosing from the remaining 2 doors
- Since the host eliminated one wrong door, you now have a 2/3 chance of winning

## Auto Play Feature

Use the Auto Play section to quickly test strategies:

- **Strategy**: Choose "Stay" or "Switch"
- **Number of Games**: Select 10, 100, or 1000 games
- **Begin**: Watch the simulation run and see statistics update

## Technologies Used

- **React 19** - UI framework
- **Material-UI** - Component library
- **Vite** - Build tool and dev server
- **Playwright** - End-to-end testing

## Project Structure

```
src/
├── components/
│   └── FlipCard.jsx      # Interactive card component
├── assets/
│   ├── goat.svg         # Goat image
│   └── pot-of-gold.svg  # Pot of gold image
├── App.jsx              # Main game logic and UI
├── main.jsx             # App entry point
└── index.css            # Global styles

tests/
└── monty-hall.spec.js   # Playwright test suite
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - feel free to use this project for educational purposes!