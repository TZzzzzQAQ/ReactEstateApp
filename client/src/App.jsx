import {RouterProvider} from "react-router-dom";
import router from "@/router/index.jsx";
import Header from "@/components/Header.jsx";

function App() {
    return (
        <>
            <Header/>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
