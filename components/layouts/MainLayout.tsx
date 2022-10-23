import { FC, ReactNode, useEffect } from "react"
import Head from 'next/head'
import { Grid, useMediaQuery } from "@mui/material"
import { Navbar, Sidebar } from "../ui"
import { fetchBalances, fetchItems } from "../../redux/actions/financesActions"
import { useAppDispatch } from "../../redux/hooks"

interface Props {
    title: string,
    children: ReactNode
}


export const MainLayout: FC<Props> = ({ title, children }) => {

    const dispatch = useAppDispatch()

    // TODO: revisar next hace el fetch cada que llama a una pagina
    useEffect(() => {
        dispatch(fetchItems())
        dispatch(fetchBalances())
    }, [dispatch])


    const matches = useMediaQuery('(min-width:600px)');


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <Grid container style={{ height: 'calc(100vh)' }}>
                <Grid item xs={0} sm={1} lg={1} hidden={!matches} style={{ borderRight: '1px solid #E4EAF2' }}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} sm={11} lg={11}>
                    <Navbar />
                    <main style={{ padding: 5 }}>
                        {children}
                    </main>
                </Grid>
            </Grid>
        </>
    )
}


