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
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router-dom";

const theme = createTheme();

const Dishes = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [dishItems, setDishItems] = useState([]);
    const [rankOne, setRankOne] = useState(null);
    const [rankTwo, setRankTwo] = useState(null);
    const [rankThree, setRankThree] = useState(null);
    const [progressIndicator, setProgressIndicator] = useState(false);
    const [firstDish, setFirstDish] = useState(null);
    const [secondDish, setSecondDish] = useState(null);
    const [thirdDish, setThirdDish] = useState(null);
    const [isVoting, setIsVoting] = useState(false);
    const history = useHistory();

    const fetchData = async (address) => {
        setProgressIndicator(true);
        try {
            const dishData = await axios.get(address);
            setDishItems(dishData.data);
            addVotes(dishData.data);
            setProgressIndicator(false);
        } catch (e) {
            console.log("error");
            if (e.response && e.response.data.message) {
                enqueueSnackbar(e.response.data.message, { variant: "error" });
            } else {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            }
        }
    };

    const addVotes = (dishElements) => {
        dishElements.forEach(object => {
            object.votes = 0;
        });
        if (!localStorage.getItem("dishesList")) {
            localStorage.setItem("dishesList", JSON.stringify(dishElements));
        }
    };

    function handleRankOne(id) {
        if (id !== rankTwo && id !== rankThree) {
            setRankOne(id);
            //setSelectedBtn(1);
        }

        if (id === rankTwo) {
            setRankTwo(null);
            setRankOne(id);
            //setSelectedBtn(2);
        }

        if (id === rankThree) {
            setRankThree(null);
            setRankOne(id);
            //setSelectedBtn(3);
        }

        const dishesArr = JSON.parse(localStorage.getItem("dishesList"));
        const currentDish = dishesArr.find(
            (dish) => dish.id === id
        );
        setFirstDish(currentDish.dishName);
    }

    function handleRankTwo(id) {
        if (id !== rankOne && id !== rankThree) {
            setRankTwo(id);
            //setSelectedBtn(2);
        }

        // switch rank within same dish item
        if (id === rankOne) {
            setRankOne(null);
            setRankTwo(id);
            //setSelectedBtn(1);
        }

        if (id === rankThree) {
            setRankThree(null);
            setRankTwo(id);
            //setSelectedBtn(3);
        }

        const dishesArr = JSON.parse(localStorage.getItem("dishesList"));
        const currentDish = dishesArr.find(
            (dish) => dish.id === id
        );
        setSecondDish(currentDish.dishName);
    }

    function handleRankThree(id) {
        if (id !== rankOne && id !== rankTwo) {
            setRankThree(id);
            //setSelectedBtn(3);
        }

        // switch rank within same dish item
        if (id === rankOne) {
            setRankOne(null);
            setRankThree(id);
            //setSelectedBtn(1);
        }

        if (id === rankTwo) {
            setRankTwo(null);
            setRankThree(id);
            //setSelectedBtn(2);
        }

        const dishesArr = JSON.parse(localStorage.getItem("dishesList"));
        const currentDish = dishesArr.find(
            (dish) => dish.id === id
        );
        setThirdDish(currentDish.dishName);
    }

    function updateDishesRanks(id, value) {
        // creating an array of dishes
        let dishesArr = JSON.parse(localStorage.getItem("dishesList"));
        let newDishAdded = dishesArr.map((item) => {
            if (item.id === id) {
                item.votes += value;
            }
            return item;
        });
        newDishAdded.sort((a, b) => {
            return parseFloat(b.votes) - parseFloat(a.votes);
        });
        localStorage.setItem("dishesList", JSON.stringify(newDishAdded));
        console.log(newDishAdded);
    }

    function handleVoting() {
        setIsVoting(true);
        updateDishesRanks(rankOne, 30);
        updateDishesRanks(rankTwo, 20);
        updateDishesRanks(rankThree, 10);

        setTimeout(() => {
            history.push("/results");
        }, 1000);
    }

    function doNotHandleVoting() {
        enqueueSnackbar(
            "Please rank all 3 dishes, before voting",
            { variant: `error` }
        );
    }

    useEffect(() => {
        const address = `${config.endpoint}`;
        fetchData(address);
        // eslint-disable-next-line
    }, []);

    const ProgressComponent = () => {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress disableShrink
                    sx={{
                        mt: 1,
                        mb: 1,
                        mx: 1,
                    }} />
                <p>Loading Products..</p>
            </Box>
        );
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
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
                            pb: 2,
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
                        {rankOne && rankTwo && rankThree ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>
                                    You've chosen to vote for..
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                        width: '60%',
                                    }}
                                >
                                    <Box sx={{
                                        m: 1,
                                        p: 1,
                                        border: 1,
                                        borderColor: 'text.primary',
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                    }} >
                                        <Typography>
                                            1st
                                        </Typography>
                                        <Typography>
                                            {firstDish}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        m: 1,
                                        p: 1,
                                        border: 1,
                                        borderColor: 'text.primary',
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        <Typography>
                                            2nd
                                        </Typography>
                                        <Typography>
                                            {secondDish}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        m: 1,
                                        p: 1,
                                        border: 1,
                                        borderColor: 'text.primary',
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        <Typography>
                                            3rd
                                        </Typography>
                                        <Typography>
                                            {thirdDish}
                                        </Typography>
                                    </Box>
                                </Box>
                                {isVoting ? (
                                    <ProgressComponent />
                                ) : (
                                    <Button
                                        sx={{ mt: 2 }}
                                        variant="contained"
                                        size="large"
                                        onClick={handleVoting}
                                    >
                                        Vote
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                size="large"
                                onClick={doNotHandleVoting}
                            >
                                Vote
                            </Button>
                        )}
                    </Box>
                    {progressIndicator ? (
                        <ProgressComponent />
                    ) : (
                        <Container sx={{ pt: 2, py: 8, height: 200 }} maxWidth="md">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                                {dishItems.map((card) => (
                                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                                        <DishCard
                                            dish={card}
                                            handleRankOne={handleRankOne}
                                            handleRankTwo={handleRankTwo}
                                            handleRankThree={handleRankThree}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    )}
                </main>
            </div>
        </ThemeProvider>
    );
};

export default Dishes;