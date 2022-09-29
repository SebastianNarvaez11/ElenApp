import { FC, PropsWithChildren, ReactNode } from "react"
import Head from 'next/head'

interface Props {
    title: string,
    children: ReactNode
}


export const MainLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}


