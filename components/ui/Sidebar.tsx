import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, IconButton } from "@mui/material"

import SaveIcon from '@mui/icons-material/SavingsRounded';
import TaskIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';


export const Sidebar = () => {

    const { asPath } = useRouter()

    return (
        <Grid container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            height='100%'
            spacing={5}
            style={{ paddingTop: 80 }}>

            <Grid item>
                <Link href='/'>
                    <IconButton aria-label="Finanzas" sx={{ color: asPath === '/' ? '#7C6DEA' : '#494969', fontSize: 25 }}>
                        <HomeIcon fontSize="inherit" />
                    </IconButton>
                </Link>
            </Grid>
            <Grid item>   
                <Link href='/finance'>
                    <IconButton aria-label="Finanzas" sx={{ color: asPath === '/finance' ? '#7C6DEA' : '#494969', fontSize: 25 }}>
                        <SaveIcon fontSize="inherit" />
                    </IconButton>
                </Link>
            </Grid>
            <Grid item>
                <IconButton aria-label="Tareas" sx={{ color: '#494969', fontSize: 25 }}>
                    <TaskIcon fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label="Calendario" sx={{ color: '#494969', fontSize: 25 }}>
                    <CalendarIcon fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>
    )
}
