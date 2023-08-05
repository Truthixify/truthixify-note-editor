//rrd imports
import { Link, useFetcher } from "react-router-dom"

//library imports
import { BookOpenIcon, TrashIcon } from "@heroicons/react/24/solid"

//helper functions
import { formatDateToLocaleString } from "../../helpers"

const NoteItem = ({ note }) => {
  const fetcher = useFetcher()

  const { id, title, content, createdAt } = note
  const tag = JSON.parse(note.tag)

  return (
    <div className="note"
      style={{
        "--accent": tag.color
      }}
    >
      <fetcher.Form
        method="post"
      >
        <input type="hidden" name="_action" value="deleteNote" />
        <input type="hidden" name="noteId" value={id} />
      <div>
        <div className="flex-sm mb mt">
          <Link
            to={`/notes/${id}`}
          >
            <BookOpenIcon width={100} />
            <p>{title}</p>
          </Link>
        </div>
        <div className="flex-lg mb">
          <p>{String(content).slice(0, 80).length < 80 ? content : `${String(content).slice(0, 200)}...`}</p>
        </div>
      </div>
      <div className="flex-sm mb">
        <p>{tag.name}</p>
        <p>{formatDateToLocaleString(createdAt)}</p>
      </div>
      <div
      className="flex-sm mb"
        style={{
          justifyContent: "space-evenly"
        }}
      >
        <button
          type="submit"
          className="btn btn--warning"
          
        >
          <TrashIcon width={20} />
          <span className="">Delete Note</span>
        </button>
      </div>
      </fetcher.Form>
    </div>
  )
}

export default NoteItem