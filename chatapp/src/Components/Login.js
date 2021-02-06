import { Container, Grid, Paper, TextField, Link, Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    return (
        <div className="loginComponent">
            <Container>
                <Grid container spacing={3} justify="center" >
                    <Grid item xs={6}>
                        <Paper className="paper">
                            <div>
                                <Typography align="center" style={{ marginTop: 30, marginBottom: 30 }} variant="h2" component="h2">
                                    Sign In
                                </Typography>
                            </div>
                            <div>
                                <TextField onChange={(e)=> setUsername(e.target.value)} fullWidth id="filled-basic" label="E-mail" variant="outlined" />
                            </div>
                            <br/>
                            <div>
                                <TextField onChange={(e)=> setPassword(e.target.value)} fullWidth id="filled-basic" label="Password" variant="outlined" />
                            </div>
                            <br />
                            <div>
                                <Button fullWidth style={{ marginBottom: 10 }} size="large" variant="contained" color="primary">
                                    Sign In
                                </Button>
                                <Button fullWidth variant="contained" size="large" color="secondary">
                                    Register
                                </Button>
                            </div>
                            <br />
                            <div>
                                
                            </div>
                            <br />
                            <div style={{ textAlign: "center" }}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                                >
                                Forgot Password
                            </Link>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
