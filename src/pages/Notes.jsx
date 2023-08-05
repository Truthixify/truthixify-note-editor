//rrd imports
import { Link, useLoaderData } from "react-router-dom"

//helper functions
import { deleteItem, fetchData } from "../../helpers"

//components
import NoteItem from "../components/NoteItem"

//library imports
import { toast } from "react-toastify"

//note loader
export function noteLoader() {
  const notes = fetchData("notes")

  return {
    notes
  }
}

//note action
export async function noteAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

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

const Note = () => {
  const { notes } = useLoaderData()

  return (
    <div className="flex-lg">
      {
        notes && notes.length > 0 ? (
          notes
          .sort((a,b) => b.createdAt - a.createdAt)
          .map((note) => (
            <NoteItem key={note.id} note={note} />
          ))
        ) : (
          <p>No notes to show</p>
        )
      }
    </div>
  )
}

export default Note