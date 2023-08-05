//rrd imports
import { createBrowserRouter, RouterProvider} from "react-router-dom"

//style imports
import "./css.css"

//layouts
import Main, { mainLoader } from "./layouts/Main"

//pages
import Error from "./pages/Error"
import Dashboard, { dashBoardAction, dashBoardLoader } from "./pages/Dashboard"
import Notes, { noteAction, noteLoader } from "./pages/Notes"
import NotePage, { notePageAction, notePageLoader } from "./pages/NotePage"

//actions
import { logoutAction } from "./actions/logout"

//library imports
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashBoardLoader,
        action: dashBoardAction,
        errorElement: <Error />,
      },
      {
        path: "notes",
        element: <Notes />,
        loader: noteLoader,
        action: noteAction,
        errorElement: <Error />,
      },
      {
        path: "notes/:id",
        element: <NotePage />,
        loader: notePageLoader,
        action: notePageAction,
        errorElement: <Error />,
      },
      {
        path: "/logout",
        action: logoutAction,
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
