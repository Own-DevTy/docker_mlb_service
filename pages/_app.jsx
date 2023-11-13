import '@/styles/globals.css'
import AppLayout from "@/components/layout/AppLayout";
import {Fragment} from "react";

import {Archivo_Black} from "next/font/google"

const ArchivoBlack = Archivo_Black({weight: '400', subsets: ['latin']})

export default function App({Component, pageProps}) {
    return (
        <Fragment>
            <style jsx global>{`
              html {
                font-family: ${ArchivoBlack.style.fontFamily};
              }
            `}</style>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Fragment>
    )
}
