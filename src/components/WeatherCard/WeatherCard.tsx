import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core'

import './WeatherCard.css'

const WeatherCardContainer: React.FC<{
  onClickAction?: () => void
}> = ({onClickAction,...props }) => {
  //listen here
  return (
    <IconButton color="secondary" aria-label="open in Vs Code" onClick={()=>onClickAction()}>
      {props.children}
     </IconButton>)
}

type WeatherCardState = 'loading' | 'error' | 'ready'

// const WeatherCard: React.FC<{
//   city: string
//   tempScale: OpenWeatherTempScale
//   onDelete?: () => void
// }> = ({ city, tempScale, onDelete }) => {
//   const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
//   const [cardState, setCardState] = useState<WeatherCardState>('loading')

//   useEffect(() => {
//     fetchOpenWeatherData(city, tempScale)
//       .then((data) => {
//         setWeatherData(data)
//         setCardState('ready')
//       })
//       .catch((err) => setCardState('error'))
//   }, [city, tempScale])

//   if (cardState == 'loading' || cardState == 'error') {
//     return (
//       <WeatherCardContainer onDelete={onDelete}>
//         <Typography className="weatherCard-title">{city}</Typography>
//         <Typography className="weatherCard-body">
//           {cardState == 'loading'
//             ? 'Loading...'
//             : 'Error: could not retrieve weather data for this city.'}
//         </Typography>
//       </WeatherCardContainer>
//     )
//   }

//   return (
//     <WeatherCardContainer onDelete={onDelete}>
//       <Grid container justify="space-around">
//         <Grid item>
//           <Typography className="weatherCard-title">
//             {weatherData.name}
//           </Typography>
//           <Typography className="weatherCard-temp">
//             {Math.round(weatherData.main.temp)}
//           </Typography>
//           <Typography className="weatherCard-body">
//             Feels like {Math.round(weatherData.main.feels_like)}
//           </Typography>
//         </Grid>
//         <Grid item>
//           {weatherData.weather.length > 0 && (
//             <>
//               <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
//               <Typography className="weatherCard-body">
//                 {weatherData.weather[0].main}
//               </Typography>
//             </>
//           )}
//         </Grid>
//       </Grid>
//     </WeatherCardContainer>
//   )
// }

export default WeatherCardContainer
