import Typography from '@mui/material/Typography';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from "react";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import DishCard from "./DishCard";
import Grid from '@mui/material/Grid';

const theme = createTheme();

const Dishes = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [dishItems, setDishItems] = useState([]);

    const fetchData = async (address) => {
        try {
            const dishData = await axios.get(address);
            setDishItems(dishData.data);
            if (!localStorage.getItem("dishesList")) {
                localStorage.setItem("dishesList", JSON.stringify(dishData.data));
            }
        } catch (e) {
            console.log("error");
            if (e.response && e.response.data.message) {
                enqueueSnackbar(e.response.data.message, { variant: "error" });
            } else {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            }
        }
    };

    useEffect(() => {
        const address = `${config.endpoint}`;
        fetchData(address);
        // eslint-disable-next-line
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <RestaurantIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Dish Poll
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 4,
                        pb: 5,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            component="h5"
                            variant="h5"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Vote for your favourite dishes.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8, height: 200 }} maxWidth="md">
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                        {dishItems.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <DishCard
                                    
                                    dish={card}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
};

export default Dishes;