//react imports
import { useEffect, useRef, useState } from "react"

//rrd imports
import { redirect, useFetcher, useLoaderData } from "react-router-dom"

//helper functions
import { deleteItem, editNote, formatDateToLocaleString, getAllMatchingItems } from "../../helpers"

//library imports
import { toast } from "react-toastify"
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid"

//components
import EditNoteForm from "../components/EditNoteForm"

export function notePageLoader({ params }) {
  const note = getAllMatchingItems({
    key: "id",
    value: params.id
  })[0]

  return {
    note
  }
}

//notePage action
export async function notePageAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if(_action === "deleteNote") {
    try {
        deleteItem({
            key: "notes",
            id: values.noteId
        })

        toast.success(`Note deleted!`)

        return redirect("/")

    } catch(e) {
        throw new Error("There was a problem deleting your note.")
    }
  }

  if(_action === "editNote") {
    try {
      editNote({
        id: values.noteId,
        content: values.editNoteContent
      })

      toast.success(`Note edited!`)

      return redirect(`/notes/${values.noteId}`)

    }catch(e) {
      throw new Error("There was a problem editing your note.")
    }
  }
}

const NotePage = () => {
  const fetcher = useFetcher()

  const isSubmitting = fetcher.state === "submitting"

  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true)
  }

  const { note } = useLoaderData()

  const tag = JSON.parse(note.tag)

  const formRef = useRef()

  useEffect(() => {
    if(!isSubmitting) {
      formRef.current.reset()
    }
  }, [isSubmitting])

  return (
    <div className="grid-lg">
      <fetcher.Form
        method="post"
        ref={formRef}
      >
        <input type="hidden" name="_action" value="deleteNote" />
        <input type="hidden" name="noteId" value={note.id} />
      <div className="note-wrapper">
        <h1 className="">{note.title}</h1>
        <p className="">{note.content}</p>
        <div className="flex-lg bt">
          <p>{tag.name}</p>
          <p>{formatDateToLocaleString(note.createdAt)}</p>
        </div>
      </div>
      {
        !edit ? (
          <div className="flex-lg notePageBtnDiv">
            <button
              onClick={() => setEdit(true)}
              className="btn btn--dark"
            >
              <PencilIcon width={20} />
              <span>Edit Note</span>
            </button>
            <button
              type="submit"
              className="btn btn--warning"
            >
              <TrashIcon width={20} />
              <span className="ml-1">Delete Note</span>
            </button>
          </div>
        ) : (
          <EditNoteForm note={note} handleEdit={handleEdit} isSubmitting={isSubmitting} />
        )
      }
      </fetcher.Form>
    </div>
  )
}

export default NotePage