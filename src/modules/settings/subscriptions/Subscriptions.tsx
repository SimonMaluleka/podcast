import { useAppContext } from '../../../context/AppContext'
import { ShowDetails } from '../../../helpers/types'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const SubscriptionCard = (show: ShowDetails)=>{
  return (
    <Card sx={{display:"flex"}}>
      <CardMedia
        component="img"
        loading="eager"
        alt={show?.title}
        image={show?.image}
        sx={{
          width: {xs:"80px", sm: "100px"},
          height: "100%",
        }} />
      <CardContent>
        <Typography variant='h6'>{show.title}</Typography>
        <Typography>{show.description.substring(0, 140)+"..."}</Typography>
      </CardContent>
    </Card>
  )
}

const Subscriptions = () => {
  const { subscriptions } = useAppContext()

  console.log(subscriptions)
  return (
    <div>
      { subscriptions ? subscriptions.map((show: ShowDetails)=><SubscriptionCard {...show}/>): <p>You're not subscribed to any shows</p>}
    </div>
  )
}

export default Subscriptions