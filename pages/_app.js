import '@/styles/globals.css'
import AppLayout from "@/components/layout/AppLayout";
import {Fragment} from "react";

export default function App({Component, pageProps}) {
    return (
        <AppLayout>
            <Component {...pageProps}/>
        </AppLayout>
    )
}
