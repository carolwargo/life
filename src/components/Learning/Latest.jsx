import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Button from '@mui/material/Button';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import businessLearning from '../../data/LearningCardData.jsx'; // Line 17: Default import

// Styled Components (from LearningContent.jsx)
const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  boxShadow: '2px 4px 4px 0px rgba(0,0,0,0.5)', // Matches LearningContent.jsx
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  padding: 16,
  flexGrow: 1,
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Line 53: TitleTypography with unused theme parameter removed
const TitleTypography = styled(Typography)(() => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
}));

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        mt: 3,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);
  const handleAddToCart = (title) => console.info(`Added "${title}" to cart`);
  const handleLearnMore = (title) => console.info(`Clicked Learn More for "${title}"`);

  // Line 92: Debug log to confirm data
  console.log('businessLearning:', businessLearning);

  return (
    <div>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      {/* Line 99: Grid container with card-based layout */}
      <Grid container spacing={2} columns={12} sx={{ my: 4 }}>
        {businessLearning.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            {/* Line 102: SyledCard for card-based design */}
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === index ? 'Mui-focused' : ''}
            >
              <Author authors={article.authors} />
              <SyledCardContent>
                {/* Line 110: Tag as caption */}
                <Typography gutterBottom variant="caption" component="div">
                  {article.tag}
                </Typography>
                {/* Line 113: Title with arrow */}
                <TitleTypography gutterBottom variant="h6" component="div">
                  {article.title}
                  <NavigateNextRoundedIcon className="arrow" sx={{ fontSize: '1rem' }} />
                </TitleTypography>
                <StyledTypography variant="body2" color="text.secondary">
                  {article.description}
                </StyledTypography>
                {/* Line 119: Rating */}
                <Rating
                  name={`rating-${index}`}
                  value={article.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{
                    color: 'brand.500',
                    '& .MuiRating-iconEmpty': {
                      color: 'gray.300',
                    },
                    '--filled-color': 'brand.500' in window ? 'brand.500' : '#1976d2',
                    '--empty-color': 'gray.300' in window ? 'gray.300' : '#bdbdbd',
                  }}
                />
              </SyledCardContent>
              {/* Line 133: Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mb: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<InfoRoundedIcon />}
                  onClick={() => handleLearnMore(article.title)}
                >
                  Learn More
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartRoundedIcon />}
                  onClick={() => handleAddToCart(article.title)}
                >
                  Add to Cart
                </Button>
              </Box>
            </SyledCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3}}>    
        <Pagination count={9} boundaryCount={9} />
      </Box>
    </div>
  );
}