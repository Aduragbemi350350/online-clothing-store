import React, {ReactNode} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

interface LayoutProps{
    children: ReactNode //Anything create can render
}

const Layout = ({children}: LayoutProps)=>{
    return(
        <>
        <Navbar />
            {children}
        <Footer />
        </>
    )
}

export default Layout