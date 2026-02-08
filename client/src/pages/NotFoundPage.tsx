import Layout from "../Layout"
import { ErrorPage } from "./ErrorPages"


const NotFoundPage = ()=>{
    const error = {
        name : "Document Not Found Error",
        message: "Page Not Found!",
        status: 404
    }
    return (
        <Layout>
            <ErrorPage error={error}/>
        </Layout>
    )
}

export default NotFoundPage