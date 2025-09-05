import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import goatImage from '../assets/goat.svg'
import potOfGoldImage from '../assets/pot-of-gold.svg'

const FlipCard = ({ 
  cardNumber, 
  hasGold = false, 
  isChosen = false, 
  isRevealed = false, 
  isFinalReveal = false,
  gamePhase = 'initial',
  onCardClick 
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (isAnimating || gamePhase !== 'initial') return // Prevent clicks during animation or after initial choice
    
    setIsAnimating(true)
    
    if (onCardClick) {
      onCardClick(cardNumber)
    }
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  // Determine what to show based on game state
  const getCardState = () => {
    if (isFinalReveal) {
      return { showBack: true, isChosen: false, isFinal: true }
    }
    if (isRevealed) {
      return { showBack: true, isChosen: false, isFinal: false }
    }
    if (isChosen) {
      return { showBack: false, isChosen: true, isFinal: false }
    }
    return { showBack: false, isChosen: false, isFinal: false }
  }

  const { showBack, isChosen: showChosen, isFinal } = getCardState()

  return (
    <Box
      data-testid="flip-card"
      sx={{
        width: '180px',
        height: '220px',
        cursor: isAnimating ? 'default' : 'pointer',
        mx: 'auto',
        perspective: '1000px',
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: showBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: showChosen 
              ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: showChosen ? '4px solid #ff4757' : '3px solid #4a5568',
            borderRadius: '16px',
            boxShadow: showChosen 
              ? '0 12px 40px rgba(255, 71, 87, 0.4)'
              : '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: showChosen 
                ? '0 16px 50px rgba(255, 71, 87, 0.5)'
                : '0 12px 40px rgba(0,0,0,0.4)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            {showChosen ? (
              <>
                            <Typography 
              variant="h3" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 1,
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                }
              }}
            >
              ✓
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              CHOSEN
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mt: 0.5
              }}
            >
              Card {cardNumber}
            </Typography>
              </>
            ) : (
              <>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    mb: 1,
                    animation: gamePhase === 'initial' ? 'pulse 2s infinite' : 'none',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                      '100%': { transform: 'scale(1)' },
                    }
                  }}
                >
                  ?
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  Card {cardNumber}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    mt: 0.5
                  }}
                >
                  {gamePhase === 'initial' ? 'Click to choose' : 'Waiting...'}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: hasGold 
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            border: '3px solid #4a5568',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src={hasGold ? potOfGoldImage : goatImage}
              alt={hasGold ? 'Pot of Gold' : 'Goat'}
              sx={{
                width: '80px',
                height: '80px',
                mb: 1,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                animation: showBack ? 'bounce 0.6s ease-in-out' : 'none',
                '@keyframes bounce': {
                  '0%': { transform: 'scale(0.3) rotate(-10deg)' },
                  '50%': { transform: 'scale(1.1) rotate(5deg)' },
                  '100%': { transform: 'scale(1) rotate(0deg)' },
                }
              }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                animation: showBack ? 'slideIn 0.6s ease-out' : 'none',
                '@keyframes slideIn': {
                  '0%': { transform: 'translateY(20px)', opacity: 0 },
                  '100%': { transform: 'translateY(0)', opacity: 1 },
                }
              }}
            >
              {hasGold ? '🏆 GOLD!' : '🐐 Goat'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mt: 0.5
              }}
            >
              {isFinal ? 'Your final choice!' : 'Revealed by host'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default FlipCard
