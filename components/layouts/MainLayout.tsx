import { FC, ReactNode } from "react"
import Head from 'next/head'
import { Grid, useMediaQuery } from "@mui/material"
import { Navbar, Sidebar} from "../ui"

interface Props {
    title: string,
    children: ReactNode
}


export const MainLayout: FC<Props> = ({ title, children }) => {


    const matches = useMediaQuery('(min-width:600px)');


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <Grid container>
                <Grid item sx={1} sm={1} hidden={!matches} style={{ boxShadow: '0px -6px 5px 0px rgb(0 0 0 / 20%)'}}>
                    <Sidebar />
                </Grid>
                <Grid item xs>
                    <Navbar />
                    <main style={{ padding: 20 }}>
                        <span>{`(min-width:600px) matches: ${matches}`}</span>
                        {children}
                    </main>
                </Grid>
            </Grid>
        </>
    )
}


