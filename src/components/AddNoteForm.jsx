//react imports
import { useEffect, useRef } from "react"

//rrd imports
import { useFetcher } from "react-router-dom"

//library imports
import { PlusIcon } from "@heroicons/react/24/solid"

const AddNoteForm = () => {
  const noteTags = [
    {
      "name": "Personal",
      "color": "0 0% 0%"
    },
    {
      "name": "Work",
      "color": "30 50% 50%"
    },
    {
      "name": "Ideas",
      "color": "60 50% 50%"
    },
    {
      "name": "To-Do",
      "color": "90 50% 50%"
    },
    {
      "name": "Important",
      "color": "120 50% 50%"
    },
    {
      "name": "Urgent",
      "color": "150 50% 50%"
    },
    {
      "name": "Shopping",
      "color": "180 50% 50%"
    },
    {
      "name": "Meeting",
      "color": "210 50% 50%"
    },
    {
      "name": "Journal",
      "color": "240 50% 50%"
    },
    {
      "name": "Inspirational",
      "color": "270 50% 50%"
    },
    {
      "name": "Recipe",
      "color": "300 50% 50%"
    },
    {
      "name": "Travel",
      "color": "330 50% 50%"
    },
    {
      "name": "Books",
      "color": "15 50% 50%"
    },
    {
      "name": "Movies",
      "color": "45 50% 50%"
    },
    {
      "name": "Health",
      "color": "75 50% 50%"
    },
    {
      "name": "Finance",
      "color": "105 50% 50%"
    },
    {
      "name": "Contacts",
      "color": "135 50% 50%"
    },
    {
      "name": "Password",
      "color": "165 50% 50%"
    },
    {
      "name": "Goals",
      "color": "195 50% 50%"
    },
    {
      "name": "Education",
      "color": "225 50% 50%"
    }
  ]
  

  const fetcher = useFetcher()

  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if(!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  })

  return (
    <div className="form-wrapper">
      <h2>Create Note</h2>
      <fetcher.Form
        method="post"
        ref={formRef}
        className="grid-sm"
      >
        <div className="grid-xs">
          <label htmlFor="newNoteTitle">Note Title</label>
          <input 
            type="text"
            name="newNoteTitle"
            id="newNoteTitle"
            placeholder="e.g., Reading the war book"
            required
            ref={focusRef} 
            className="input is-large"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newNoteContent">Note Content</label>
          <textarea 
            name="newNoteContent" 
            id="newNoteContent" 
            required
            className="textarea is-large"
          ></textarea>
        </div>
        <div className="grid-xs">
          <label htmlFor="newNoteTag">Note Tag</label>
          <select 
            name="newNoteTag" 
            id="newNoteTag"
            required
          >
            {
              noteTags.map(tag => (
                <option key={crypto.randomUUID()} value={JSON.stringify(tag)}>{tag.name}</option>
              ))
            }
          </select>
        </div>
        <input 
          type="hidden" 
          name="_action"
          value="createNote"
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="btn btn--success"
        >
          <PlusIcon width={20} />
          <span className="ml-1">Create Note</span>
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddNoteForm