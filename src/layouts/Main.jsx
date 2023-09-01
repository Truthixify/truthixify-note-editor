//rrd imports
import { Outlet, useLoaderData } from "react-router-dom"

//helper import
import { fetchData } from "../../helpers"

//components
import Nav from "../components/Nav"
import Footer from "../components/Footer"

//loader function
export function mainLoader() {
    const userName = fetchData("userName")

    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData()
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Main