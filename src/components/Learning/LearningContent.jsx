import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Rating from '@mui/material/Rating'; // Added for star ratings
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Button from '@mui/material/Button';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import { learningCardData } from '../../data/learningCardData.jsx'; // Line 23: Matches provided path

// Line 25: Log to verify import
console.log('Imported learningCardData:', learningCardData);

// Styled Components
const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  boxShadow: '2px 4px 4px 0px rgba(0,0,0,0.5)',
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

// Reusable Components
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
        py: 1,
        mt: 1,
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
        <Typography variant="caption">{authors.map((author) => author.name).join(', ')}</Typography>
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

function Search({ id = 'search', onSearch }) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id={id}
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        onChange={(e) => onSearch(e.target.value)}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{ 'aria-label': 'search' }}
      />
    </FormControl>
  );
}

Search.propTypes = {
  id: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

function LearningCard({ card, index, onFocus, onBlur, onLearnMore, onAddToCart, gridSize, focusedCardIndex }) {
  return (
    <Grid size={gridSize} key={index}>
      <SyledCard
        variant="outlined"
        onFocus={() => onFocus(index)}
        onBlur={onBlur}
        tabIndex={0}
        className={focusedCardIndex === index ? 'Mui-focused' : ''}>
        <Author authors={card.authors} />
        <CardMedia
          component="img"
          image={card.img}
          alt={card.title}
          sx={{
            height: gridSize.md === 6 ? { xs: 'auto' } : gridSize.md === 4 ? 200 : { sm: 'auto', md: '50%' },
            aspectRatio: gridSize.md === 6 ? '16 / 9' : gridSize.md === 4 ? undefined : { sm: '16 / 9', md: '' },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <SyledCardContent>
          {gridSize.md === 4 ? (
            <Chip label={card.tag} size="small" sx={{ alignSelf: 'start', mb: 1 }} color="primary" />
          ) : (
            <Typography gutterBottom variant="caption" component="div">{card.tag}</Typography>
          )}
          <Typography gutterBottom variant="h6" component="div">{card.title}</Typography>
          <StyledTypography variant="body2" color="text.secondary">{card.description}</StyledTypography>
          {/* Line 141: Added Rating component to display star rating */}
          <Rating
            name={`rating-${index}`}
            value={card.rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              color: 'brand.500', // Matches inputsCustomizations secondary color
              '& .MuiRating-iconEmpty': {
                color: 'gray.300', // Matches theme's light gray
              },
            }}
          />
        </SyledCardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mb: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<InfoRoundedIcon />}
            onClick={() => onLearnMore(card.title)}
          >
            Learn More
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCartRoundedIcon />}
            onClick={() => onAddToCart(card.title)}
          >
            Add to Cart
          </Button>
        </Box>
      </SyledCard>
    </Grid>
  );
}

LearningCard.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    ).isRequired,
    rating: PropTypes.number.isRequired, // Line 171: Added rating prop
  }).isRequired,
  index: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onLearnMore: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  gridSize: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
  }).isRequired,
  focusedCardIndex: PropTypes.number,
};

function Section({ title, subtitle, cards, gridSize, emptyMessage, onFocus, onBlur, onLearnMore, onAddToCart, setSelectedCategory, focusedCardIndex }) {
  return (
    <>
      <Box sx={{ mb: 4, mt: title === 'Explore Featured Learning' ? 4 : 0 }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Box>
      <Grid container spacing={2} columns={12}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <LearningCard
              key={index}
              card={card}
              index={index}
              onFocus={onFocus}
              onBlur={onBlur}
              onLearnMore={onLearnMore}
              onAddToCart={onAddToCart}
              gridSize={gridSize}
              focusedCardIndex={focusedCardIndex}
            />
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">{emptyMessage}</Typography>
            <Button
              variant="text"
              onClick={() => setSelectedCategory('All categories')}
              sx={{ mt: 1 }}
            >
              View All Categories
            </Button>
          </Box>
        )}
      </Grid>
      <Divider sx={{ my: 4 }} />
    </>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        }),
      ).isRequired,
      rating: PropTypes.number.isRequired, // Line 219: Added rating prop
    }),
  ).isRequired,
  gridSize: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
  }).isRequired,
  emptyMessage: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onLearnMore: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  focusedCardIndex: PropTypes.number,
};

// Main Component
export default function LearningContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState('All categories');
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleFocus = (index) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);
  const handleClick = (category) => {
    setSelectedCategory(category);
    console.info(`Selected category: ${category}`);
  };
  const handleAddToCart = (title) => console.info(`Added "${title}" to cart`);
  const handleLearnMore = (title) => console.info(`Clicked Learn More for "${title}"`);
  const handleSearch = (query) => setSearchQuery(query.toLowerCase());

  // Line 246: Dynamically generate categories
  const categories = React.useMemo(() => {
    const tags = [...new Set(learningCardData.map(card => card.tag))];
    return ['All categories', ...tags];
  }, []);

  // Line 252: Memoized filtered cards
  const filteredCards = React.useMemo(() => {
    let result = learningCardData;
    if (selectedCategory !== 'All categories') {
      result = result.filter(card => card.tag === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(
        card =>
          card.title.toLowerCase().includes(searchQuery) ||
          card.description.toLowerCase().includes(searchQuery)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  // Line 268: Chip styles matching original nav menu and inputsCustomizations
  const chipStyles = (label) => ({
    backgroundColor: label === selectedCategory ? 'gray.900' : 'transparent',
    color: label === selectedCategory ? 'white' : 'text.primary',
    border: 'none',
    ...(label === selectedCategory && {
      backgroundImage: `linear-gradient(to bottom, gray.700, gray.800)`,
      boxShadow: `inset 0 1px 0 gray.600, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
    }),
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible',
        boxSizing: 'border-box',
        minHeight: '200vh',
      }}
    >
      {/* Line 286: Debug log */}
      {console.log("Rendering LearningContent component")}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Explore All Learning</Typography>
        <Typography variant="body1">Start with a category of interest below.</Typography>
      </Box>

      {/* Search (Mobile) */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: '100%',
          overflow: 'auto',
          mb: 2,
        }}
      >
        <Search id="mobile-search" onSearch={handleSearch} />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>

      {/* Navigation Chips and Search (Desktop) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'inline-flex', flexDirection: 'row', gap: 1, overflow: 'auto' }}>
          <Chip
            key="All categories"
            onClick={() => handleClick('All categories')}
            size="medium"
            label="All categories"
            sx={selectedCategory === 'All categories' ? {
              backgroundColor: 'gray.900',
              color: 'white',
              backgroundImage: `linear-gradient(to bottom, gray.700, gray.800)`,
              boxShadow: `inset 0 1px 0 gray.600, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              border: 'none',
            } : {}}
          />
          {categories.filter(label => label !== 'All categories').map((label) => (
            <Chip
              key={label}
              onClick={() => handleClick(label)}
              size="medium"
              label={label}
              sx={chipStyles(label)}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
          }}
        >
          <Search id="desktop-search" onSearch={handleSearch} />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ my: 4 }} />

      {/* Sections */}
      <Section
        title="Explore Featured Learning"
        subtitle="Latest learning for beauty professionals."
        cards={filteredCards.slice(0, 2)}
        gridSize={{ xs: 12, md: 6 }}
        emptyMessage="No featured courses available for this category."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onLearnMore={handleLearnMore}
        onAddToCart={handleAddToCart}
        setSelectedCategory={setSelectedCategory}
        focusedCardIndex={focusedCardIndex}
      />
      <Section
        title="Explore New Learning"
        subtitle="Newly added material to grow your skills."
        cards={filteredCards}
        gridSize={{ xs: 12, sm: 6, md: 4 }}
        emptyMessage="No new courses available for this category."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onLearnMore={handleLearnMore}
        onAddToCart={handleAddToCart}
        setSelectedCategory={setSelectedCategory}
        focusedCardIndex={focusedCardIndex}
      />
      <Section
        title="Additional Learning"
        subtitle="More opportunities to enhance your skills."
        cards={filteredCards.slice(2)}
        gridSize={{ xs: 12, md: 4 }}
        emptyMessage="No additional courses available for this category."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onLearnMore={handleLearnMore}
        onAddToCart={handleAddToCart}
        setSelectedCategory={setSelectedCategory}
        focusedCardIndex={focusedCardIndex}
      />
    </Box>
  );
}