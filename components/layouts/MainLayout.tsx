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

            <Grid container style={{height: 'calc(100vh)'}}>
                <Grid item xs={1} sm={1} lg={1} hidden={!matches} style={{ borderRight: '1px solid #E4EAF2'}}>
                    <Sidebar />
                </Grid>
                <Grid item xs>
                    <Navbar />
                    <main style={{ padding: 20 }}>
                        {children}
                    </main>
                </Grid>
            </Grid>
        </>
    )
}


