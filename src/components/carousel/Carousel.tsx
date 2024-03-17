import { useEffect, useState} from 'react'
import Slide from '@mui/material/Slide'
import Stack  from '@mui/material/Stack'
import { Show, useAppContext } from '../../context/AppContext'
import { Container, IconButton, Box } from '@mui/material'
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CarouselShowPreview from './CarouselShowPreview'

const Carousel = () => {
    const { shows } = useAppContext()
    const [currentPage, setCurrentPage ] = useState(0)
    const [cards, setCards] = useState<Show[]>([])
    const cardsPerPage = 4
    const containerWidth = cardsPerPage * 200;
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

  // setInterval(()=>{
  //     if(currentPage < 5 ) {
  //       setCurrentPage((prev)=>prev+1)}
  //       else if(currentPage >=5){
  //         setCurrentPage((prev)=>prev-1) 
  //     } 
  // }, 5000)

    useEffect(()=>{  
      const trending: Show[] = []
      for(let i=0; i<=24;i++){
        trending.push(shows[Math.random()])
        i++
      }   
        setCards(shows)
    },[shows])

  return (
    <Container sx={{display: 'flex', mY:'4'}}>
      <IconButton
        onClick={handlePrevPage}
        sx={{ marginX: 5, display: { xs: 'none', sm: 'block' }}}
        disabled={currentPage === 0}
        disableRipple
      >
        {/* this is the button that will go to the previous page you can change these icons to whatever you wish*/}
        <NavigateBeforeIcon sx={{color:'white'}} />
      </IconButton>    
      <Box sx={{ width: `${containerWidth}px`, margin: "auto" }}>
          {cards.map((_, index) => (
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
                        <CarouselShowPreview {...show} />
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
            marginX: 5,
            display: { xs: 'none', sm: 'block' }
          }}
          disabled={
            currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1
          }
        >
          <NavigateNextIcon sx={{color:'white'}}/>
        </IconButton>
      </Container>
  )
}

export default Carousel