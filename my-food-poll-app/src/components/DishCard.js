import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const DishCard = ({ dish }) => {

    console.log(dish);

    return (
        <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            border: 1,
            borderColor: 'text.primary'
            }}>
            <CardMedia
                component="img"
                image={dish.image}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {dish.dishName}
                </Typography>
                <Typography>
                    {dish.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Button variant="contained" size="small">1</Button>
                <Button variant="contained" size="small">2</Button>
                <Button variant="contained" size="small">3</Button>
            </CardActions>
        </Card>
    );
}

export default DishCard;