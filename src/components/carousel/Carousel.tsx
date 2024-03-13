import { useEffect, useState} from 'react'
//import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import Stack  from '@mui/material/Stack'
import { Show, useAppContext } from '../../context/AppContext'
import ShowCard from '../show/ShowCard'
import { Container, IconButton, Box } from '@mui/material'
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Carousel = () => {
    const { shows } = useAppContext()
    const [currentPage, setCurrentPage ] = useState(0)
    const [cards, setCards] = useState<Show[]>([])
    const cardsPerPage = 4
    const containerWidth = cardsPerPage * 250;
    // const duplicateCards: React.ReactElement[] = Array.from(
    //     {length: 10},
    //     (_, index) => <img src={''} alt='' key={index}/>
    // )

    const handleNextPage = ()=>{
        setCurrentPage((prevPage)=>prevPage+1)
    }

    const handlePrevPage = () => {
    // setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

    useEffect(()=>{
        setCards(shows)
    },[shows])
  return (
    <Container sx={{mt: 20, display: 'flex',}}>
      <IconButton
        onClick={handlePrevPage}
        sx={{ margin: 5 }}
        disabled={currentPage === 0}
      >
        {/* this is the button that will go to the previous page you can change these icons to whatever you wish*/}
        <NavigateBeforeIcon />
      </IconButton>    
      <Box sx={{ width: `${containerWidth}px`, height: "8%", margin: "auto" }}>
          {/* this is the box that holds the cards and the slide animation,
          in this implementation the card is already constructed but in later versions you will see how the
          items you wish to use will be dynamically created with the map method*/}
          {cards.map((card, index) => (
            <Box
              key={`card-${index}`}
              sx={{
                width: "100%",
                height: "100%",
                display: currentPage === index ? "block" : "none",
              }}
            >
              {/* this is the slide animation that will be used to slide the cards in and out*/}
              <Slide direction={'right'} in={currentPage === index}>
                <Stack
                  spacing={2}
                  direction="row"
                  alignContent="center"
                  justifyContent="center"
                  sx={{ width: "100%", height: "100%" }}
                >
                  {/* this slices the cards array to only display the amount you have previously determined per page*/}
                  {cards
                    .slice(
                      index * cardsPerPage,
                      index * cardsPerPage + cardsPerPage
                    )
                    .map((show: Show) => (
                      <Box key={show.id}>
                        <ShowCard {...show} />
                      </Box>
                    ))}
                </Stack>
              </Slide>
            </Box>
          ))}
          
        </Box>
        <IconButton
          onClick={handleNextPage}
          sx={{
            margin: 5,
          }}
          disabled={
            currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1
          }
        >
          <NavigateNextIcon />
        </IconButton>
      </Container>
  )
}

export default Carousel