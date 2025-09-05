import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Button,
} from '@mui/material'
import {
  Casino as CasinoIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'
import FlipCard from './components/FlipCard'

function App() {
  const [gameState, setGameState] = useState({
    goldCard: Math.floor(Math.random() * 3) + 1, // Random card 1, 2, or 3 has gold
    chosenCard: null, // Card chosen by player
    revealedCard: null, // Card revealed by host (goat)
    finalChoice: null, // Player's final choice (stay or switch)
    gamePhase: 'initial' // 'initial', 'chosen', 'revealed', 'decision', 'final'
  })

  const [statistics, setStatistics] = useState({
    totalGames: 0,
    stayGames: 0,
    switchGames: 0,
    stayWins: 0,
    switchWins: 0,
    stayLosses: 0,
    switchLosses: 0
  })

  const handleCardClick = (cardNumber) => {
    if (gameState.gamePhase === 'initial') {
      // Player chooses a card
      setGameState(prev => ({
        ...prev,
        chosenCard: cardNumber,
        gamePhase: 'chosen'
      }))
      
      // After a brief delay, reveal a goat
      setTimeout(() => {
        revealGoat(cardNumber)
      }, 1000)
    }
  }

  const revealGoat = (chosenCard) => {
    const { goldCard } = gameState
    let goatCard = null
    
    // Find a card that has a goat (not the chosen card, not the gold card)
    for (let i = 1; i <= 3; i++) {
      if (i !== chosenCard && i !== goldCard) {
        goatCard = i
        break
      }
    }
    
    setGameState(prev => ({
      ...prev,
      revealedCard: goatCard,
      gamePhase: 'decision'
    }))
  }

  const handleStay = () => {
    const { chosenCard, goldCard } = gameState
    const won = chosenCard === goldCard
    
    // Update statistics immediately
    setStatistics(prev => {
      const newStats = {
        ...prev,
        totalGames: prev.totalGames + 1,
        stayGames: prev.stayGames + 1
      }
      
      if (won) {
        newStats.stayWins += 1
      } else {
        newStats.stayLosses += 1
      }
      
      return newStats
    })
    
    setGameState(prev => ({
      ...prev,
      finalChoice: 'stay',
      gamePhase: 'final'
    }))
  }

  const handleSwitch = () => {
    // Find the remaining card (not chosen, not revealed)
    const { chosenCard, revealedCard, goldCard } = gameState
    let switchCard = null
    
    for (let i = 1; i <= 3; i++) {
      if (i !== chosenCard && i !== revealedCard) {
        switchCard = i
        break
      }
    }
    
    const won = switchCard === goldCard
    
    // Update statistics immediately
    setStatistics(prev => {
      const newStats = {
        ...prev,
        totalGames: prev.totalGames + 1,
        switchGames: prev.switchGames + 1
      }
      
      if (won) {
        newStats.switchWins += 1
      } else {
        newStats.switchLosses += 1
      }
      
      return newStats
    })
    
    setGameState(prev => ({
      ...prev,
      finalChoice: 'switch',
      chosenCard: switchCard, // Update chosen card to the switched one
      gamePhase: 'final'
    }))
  }

  const resetGame = () => {
    setGameState({
      goldCard: Math.floor(Math.random() * 3) + 1,
      chosenCard: null,
      revealedCard: null,
      finalChoice: null,
      gamePhase: 'initial'
    })
  }

  const getInstructions = () => {
    switch (gameState.gamePhase) {
      case 'initial':
        return 'Click any card to choose it!'
      case 'chosen':
        return 'The host is revealing a goat...'
      case 'decision':
        return 'Make your final decision!'
      case 'final':
        return 'Game complete! Click "New Game" to play again.'
      default:
        return 'Click any card to choose it!'
    }
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <CasinoIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Monty Hall Problem
          </Typography>
          <Button
            color="inherit"
            startIcon={<RefreshIcon />}
            onClick={resetGame}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}
          >
            New Game
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
        <Grid container spacing={2}>
          {/* Game Cards */}
          <Grid item xs={12} md={8} lg={7} xl={8}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'white' }}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3, color: '#1976d2' }}>
                {getInstructions()}
              </Typography>
              <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FlipCard
                    cardNumber={1}
                    hasGold={gameState.goldCard === 1}
                    isChosen={gameState.chosenCard === 1}
                    isRevealed={gameState.revealedCard === 1}
                    isFinalReveal={gameState.gamePhase === 'final' && gameState.chosenCard === 1}
                    gamePhase={gameState.gamePhase}
                    onCardClick={handleCardClick}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FlipCard
                    cardNumber={2}
                    hasGold={gameState.goldCard === 2}
                    isChosen={gameState.chosenCard === 2}
                    isRevealed={gameState.revealedCard === 2}
                    isFinalReveal={gameState.gamePhase === 'final' && gameState.chosenCard === 2}
                    gamePhase={gameState.gamePhase}
                    onCardClick={handleCardClick}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FlipCard
                    cardNumber={3}
                    hasGold={gameState.goldCard === 3}
                    isChosen={gameState.chosenCard === 3}
                    isRevealed={gameState.revealedCard === 3}
                    isFinalReveal={gameState.gamePhase === 'final' && gameState.chosenCard === 3}
                    gamePhase={gameState.gamePhase}
                    onCardClick={handleCardClick}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Decision/Results Panel - Always Visible */}
          <Grid item xs={12} md={4} lg={5} xl={4}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: '#fff3cd', textAlign: 'center', minHeight: '300px' }}>
              {/* Stay/Switch Decision Buttons */}
              {gameState.gamePhase === 'decision' && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ color: '#856404', mb: 2 }}>
                    🎯 Make Your Final Decision
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You chose Card {gameState.chosenCard}. The host revealed a goat behind Card {gameState.revealedCard}.
                    <br/>
                    Do you want to stay with your original choice or switch to the remaining card?
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={handleStay}
                      sx={{
                        bgcolor: '#28a745',
                        '&:hover': { bgcolor: '#218838' },
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      🏠 Stay with Card {gameState.chosenCard}
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={handleSwitch}
                      sx={{
                        bgcolor: '#007bff',
                        '&:hover': { bgcolor: '#0056b3' },
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      🔄 Switch to Other Card
                    </Button>
                  </Box>
                </>
              )}

              {/* Final Result */}
              {gameState.gamePhase === 'final' && (
                <>
                  <Typography variant="h4" gutterBottom sx={{ 
                    color: gameState.chosenCard === gameState.goldCard ? '#155724' : '#721c24'
                  }}>
                    {gameState.chosenCard === gameState.goldCard ? '🎉 YOU WIN! 🎉' : '😢 You Lost'}
                  </Typography>
                  <Typography variant="h6" paragraph sx={{ 
                    color: gameState.chosenCard === gameState.goldCard ? '#155724' : '#721c24'
                  }}>
                    {gameState.chosenCard === gameState.goldCard 
                      ? 'Congratulations! You found the pot of gold!' 
                      : 'Better luck next time!'
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You {gameState.finalChoice === 'stay' ? 'stayed' : 'switched'} and chose Card {gameState.chosenCard}.
                    <br/>
                    The gold was behind Card {gameState.goldCard}.
                  </Typography>
                </>
              )}

              {/* Waiting State */}
              {gameState.gamePhase === 'initial' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#856404' }}>
                    🎯 Decision Panel
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Choose a card to begin the game!
                  </Typography>
                </Box>
              )}

              {/* Chosen State */}
              {gameState.gamePhase === 'chosen' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#856404' }}>
                    🎯 Decision Panel
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    The host is revealing a goat...
                    <br/>
                    Get ready to make your decision!
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Statistics - Always Visible */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#495057' }}>
                  📊 Your Statistics
                </Typography>
                <Button 
                  size="small"
                  variant="outlined"
                  onClick={() => setStatistics({
                    totalGames: 0,
                    stayGames: 0,
                    switchGames: 0,
                    stayWins: 0,
                    switchWins: 0,
                    stayLosses: 0,
                    switchLosses: 0
                  })}
                  sx={{ 
                    minWidth: 'auto',
                    px: 2,
                    py: 0.5,
                    fontSize: '0.75rem'
                  }}
                >
                  Reset Stats
                </Button>
              </Box>
              <Grid container spacing={2}>
                {/* Overall Stats */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                    <Typography variant="h5" sx={{ color: '#007bff', fontWeight: 'bold' }}>
                      {statistics.totalGames}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Games
                    </Typography>
                  </Box>
                </Grid>
                
                {/* Stay Stats */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 1.5, 
                    bgcolor: 'white', 
                    borderRadius: 2, 
                    boxShadow: 1,
                    border: statistics.stayGames > 0 && statistics.switchGames > 0 && 
                            (statistics.stayWins / statistics.stayGames) > (statistics.switchWins / statistics.switchGames) 
                            ? '2px solid #28a745' : '1px solid #dee2e6'
                  }}>
                    <Typography variant="h5" sx={{ color: '#28a745', fontWeight: 'bold' }}>
                      {statistics.stayGames > 0 ? Math.round((statistics.stayWins / statistics.stayGames) * 100) : 0}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🏠 Stay Win Rate
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({statistics.stayWins}/{statistics.stayGames} games)
                    </Typography>
                    {statistics.stayGames > 0 && statistics.switchGames > 0 && 
                     (statistics.stayWins / statistics.stayGames) > (statistics.switchWins / statistics.switchGames) && (
                      <Typography variant="caption" sx={{ color: '#28a745', fontWeight: 'bold', display: 'block', mt: 0.5 }}>
                        🏆 Currently Better!
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Switch Stats */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 1.5, 
                    bgcolor: 'white', 
                    borderRadius: 2, 
                    boxShadow: 1,
                    border: statistics.stayGames > 0 && statistics.switchGames > 0 && 
                            (statistics.switchWins / statistics.switchGames) > (statistics.stayWins / statistics.stayGames) 
                            ? '2px solid #dc3545' : '1px solid #dee2e6'
                  }}>
                    <Typography variant="h5" sx={{ color: '#dc3545', fontWeight: 'bold' }}>
                      {statistics.switchGames > 0 ? Math.round((statistics.switchWins / statistics.switchGames) * 100) : 0}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🔄 Switch Win Rate
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({statistics.switchWins}/{statistics.switchGames} games)
                    </Typography>
                    {statistics.stayGames > 0 && statistics.switchGames > 0 && 
                     (statistics.switchWins / statistics.switchGames) > (statistics.stayWins / statistics.stayGames) && (
                      <Typography variant="caption" sx={{ color: '#dc3545', fontWeight: 'bold', display: 'block', mt: 0.5 }}>
                        🏆 Currently Better!
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              
              {/* Probability Theory Note */}
              <Box sx={{ mt: 2, p: 1.5, bgcolor: '#e3f2fd', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  💡 <strong>Theory:</strong> Switching should give you a ~67% win rate, while staying should give you ~33%
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center', bgcolor: '#e8f5e8' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                🎮 How to Play
              </Typography>
              <Typography variant="body1" color="text.secondary">
                • Click any card to choose it (it won't flip yet!)<br/>
                • The host will reveal a goat from one of the other cards<br/>
                • Choose to stay with your original choice or switch to the remaining card<br/>
                • Two cards hide goats 🐐, one card hides a pot of gold 🏆<br/>
                • Click "New Game" to start over with a new random arrangement
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App