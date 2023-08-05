//rrd imports
import { Form, NavLink } from "react-router-dom"

import { BookOpenIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

const Nav = ({ userName }) => {


  return (
    <nav className="column navbar">
      <NavLink
        to="/"
        aria-label="Go to home"
        className="navbar-brand"
      >
        <BookOpenIcon width={60} />
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={(event) => {
                if(!confirm("Delete user and all data?")) {
                    event.preventDefault()
                }
            }}
          >
            <button 
              type="submit"
              className="btn btn--warning"
            >
                <ArrowUturnLeftIcon width={20} />
                <span>Delete User</span>
            </button>
          </Form>
        )
      }
    </nav>
  )
}

export default Nav