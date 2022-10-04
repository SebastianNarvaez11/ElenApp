import { Grid, IconButton } from "@mui/material"
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

export const Sidebar = () => {


    return (
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center" height='100%'>

            <Grid item>
                <IconButton aria-label="Finanzas" size="large" sx={{ color: '#494969' }}>
                    <SavingsRoundedIcon fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label="Finanzas" size="large" sx={{ color: '#494969' }}>
                    <AssignmentTurnedInRoundedIcon fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label="Finanzas" size="large" sx={{ color: '#494969' }}>
                    <CalendarMonthRoundedIcon fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>
    )
}
