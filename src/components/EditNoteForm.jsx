//react imports
import { useRef, useState } from "react"

//library imports
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid"

const EditNoteForm = ({ note, handleEdit, isSubmitting }) => {

  const clearRef = useRef()

  const [content, setContent] = useState(note.content)

  return (
    <div className='note-wrapper'>
      <input type="hidden" name="_action" value="editNote" />
      <input type="hidden" name="noteId" value={note.id} />
      <label htmlFor="editNote">Edit Note</label>
      <textarea 
        name="editNoteContent" 
        id="editNoteContent" 
        value={content}
        ref={clearRef}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      ></textarea>
      <div className="flex-lg">
        <button
          onClick={(e) => {
            e.preventDefault()
            handleEdit()
          }}
          className='btn btn--warning'
        >
          <XMarkIcon width={20} />
          <span>Cancel Edit</span>
        </button>
        <button
          className="btn btn--dark"
          onClick={(e) => {
            e.preventDefault()
            clearRef.current.value = ""
          }}
        >
          Clear Content
        </button>
        <button
          type='submit'
          className='btn btn--primary'
          disabled={isSubmitting}
        >
          <CheckIcon width={20} />
          <span className="ml-1">{isSubmitting ? "Saving Note" : "Save Note"}</span>
        </button>
      </div>
    </div>
  )
}

export default EditNoteForm