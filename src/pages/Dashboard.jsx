//rrd imports
import { Link, useLoaderData } from "react-router-dom"

//components
import Intro from "../components/Intro"
import AddNoteForm from "../components/AddNoteForm"
import NoteItem from "../components/NoteItem"

//helper functions
import { createNote, deleteItem, fetchData } from "../../helpers"
import { toast } from "react-toastify"

//loader function
export function dashBoardLoader() {
  const userName = fetchData("userName")
  const notes = fetchData("notes")

  return {
    userName,
    notes
  }
}

//action function
export async function dashBoardAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if(_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName))

      return toast.success(`Welcome, ${values.userName}`)
    }catch(e) {
      throw new Error("There was a problem creating your account")
    }
  }

  if(_action === "createNote") {
    try {
      createNote({
        title: values.newNoteTitle,
        content: values.newNoteContent,
        tag: values.newNoteTag
      })

      return toast.success(`Note ${String(values.newNoteTitle).slice(0, 10)}... created!`)
    }catch(e) {
      throw new Error("There was a problem creating your note")
    }
  }

  if(_action === "deleteNote") {
    try {
        deleteItem({
            key: "notes",
            id: values.noteId
        })

        return toast.success(`Note deleted!`)

    } catch(e) {
        throw new Error("There was a problem deleting your note.")
    }
  }
}

const Dashboard = () => {

  const {
    userName,
    notes
  } = useLoaderData()

  return (
    <div className="">
      {
        userName ? (
          <div className="dashboard">
            <h1 className="">Welcome back, <span className="accent">{userName}</span></h1>
            <h2 className="title container has-text-centered">Create Your Personal Notes Below</h2>
            <div className="grid-sm">
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddNoteForm />
                </div>
                <div className="notes">
                  {
                    notes && notes.length > 0 && (
                      notes
                      .sort((a,b) => b.createdAt - a.createdAt)
                      .map(note => (
                        <NoteItem key={note.id} note={note} />
                      ))
                      .splice(0, 4)
                    )
                  }
                </div>
              </div>
            </div>
            <Link
                to="/notes"
                className="btn btn--primary"
                style={{
                  color: "#fff"
                }}
              >
                View All Notes
            </Link>
          </div>
        ) : (
          <Intro />
        )
      }
    </div>
  )
}

export default Dashboard