import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useHistory } from "react-router-dom";

const theme = createTheme();

const Home = () => {

    const history = useHistory();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <RestaurantIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" color="inherit" noWrap>
                            Dish Poll
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            mx: 1
                        }}
                        onClick={() => history.push("/", { from: "Home" })}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Welcome to Dish Poll
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            You are given a list of dishes, rank them from 1 to 3 according to your choice. Each selection will be given points based on the rank (Rank 1 gets 30 points, Rank 2 gets 20, Rank 3 gets 10). Based on the voting of all the users, results will be calculated. So vote for your favourite dishes to make them win!
                        </Typography>
                            <Button
                                variant="contained"
                                onClick={() => history.push("/dishes", { from: "Home" })}

                            >
                                Vote for Dishes
                            </Button>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default Home;