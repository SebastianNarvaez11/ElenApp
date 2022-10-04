import { FC, ReactNode } from "react"
import Head from 'next/head'
import { Grid, useMediaQuery } from "@mui/material"
import { Navbar } from "../ui"
import { useAppSelector } from "../../redux/hooks"

interface Props {
    title: string,
    children: ReactNode
}


export const MainLayout: FC<Props> = ({ title, children }) => {


    const { hideSidebar } = useAppSelector(state => state.ui)

    const matches = useMediaQuery('(min-width:600px)');


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <Grid container>
                <Grid item sm={2} hidden={hideSidebar}>
                    sidebar
                </Grid>
                <Grid item xs>
                    <Navbar />
                    <span>{`(min-width:600px) matches: ${matches}`}</span>
                    {children}
                </Grid>
            </Grid>
            {/* <main>
                {children}
            </main> */}
        </>
    )
}


