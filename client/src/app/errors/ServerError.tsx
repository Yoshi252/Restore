import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom"

export default function ServerError(){

    const history = useHistory()
    const {state} = useLocation<any>()

    return (
        <>
          <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant="h3" color="error" gutterBottom >{state.error.title}</Typography>
                    <Divider sx={{mb:3}} />
                    <Typography variant="h3">{state.error.detail} || Internal server error</Typography>
                </>
            ): (
                <Typography variant="h3">Server Error</Typography>
            )}
            <Button onClick={()=> history.push("/catalog")}>Go back</Button>
          </Container>
        </>
    )
}