//rrd imports
import { useFetcher } from "react-router-dom"

//library imports
import { PlusIcon } from "@heroicons/react/24/solid"

const Intro = () => {
  const fetcher = useFetcher()
  
  const isSubmitting = fetcher.state === "submitting"

  return (
    <div className="intro">
      <h1>A Personal and Simple Note Editor</h1>
      <fetcher.Form method="post">
        <div className="field">
          <div className="label">Name</div>
          <div className="control">
            <input 
              type="text"
              name="userName"
              placeholder="What is your name?"
              aria-label="Your name"
              autoComplete="given-name"
              className="input is-large"
            />
          </div>
        </div>
        
        <input 
          type="hidden"
          name="_action"
          value="newUser"
        />
        <div className="field">
          <div className="control">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn btn--dark"
            >
              <PlusIcon width={20} />
              <span className="ml-1">Create your account</span>
            </button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  )
}

export default Intro