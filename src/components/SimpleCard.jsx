import { Box, Card, CardContent, Typography } from '@mui/material'
import goatImage from '../assets/goat.svg'
import potOfGoldImage from '../assets/pot-of-gold.svg'

const SimpleCard = ({ cardNumber, hasGold = false }) => {
  return (
    <Box sx={{ width: '250px', height: '300px', mx: 'auto' }}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          background: hasGold 
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          border: '3px solid #4a5568',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src={hasGold ? potOfGoldImage : goatImage}
            alt={hasGold ? 'Pot of Gold' : 'Goat'}
            sx={{
              width: '120px',
              height: '120px',
              mb: 2,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {hasGold ? '🏆 GOLD!' : '🐐 Goat'}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              mt: 1
            }}
          >
            Card {cardNumber}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SimpleCard
