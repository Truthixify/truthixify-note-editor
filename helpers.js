//fetch data
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

//delete item
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key)
    if(id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key)
}

//Get all items from local storage
export const getAllMatchingItems = ({key, value}) => {
    const data = fetchData("notes") ?? []
    return data.filter((item) => item[key] === value)
}

//create note
export const createNote = ({
    title, content, tag
}) => {
    const newNote = {
        id: crypto.randomUUID(),
        title: title,
        content: content,
        tag: tag,
        createdAt: Date.now()
    }

    const existingNotes = fetchData("notes") ?? []

    return localStorage.setItem("notes", JSON.stringify([...existingNotes, newNote]))
}

//edit item
export const editNote = ({ 
    id, content
 }) => {
    const notes = fetchData("notes") ?? []

    const note = getAllMatchingItems({
        key: "id",
        value: id
    })[0]

    const newNotes = notes.map(n => {
        if(n.id === note.id) {
            return {
                ...n, 
                content: content, 
                createdAt: Date.now()
            }
        }

        return n
    })

    return localStorage.setItem("notes", JSON.stringify(newNotes))
}

//format date
export const formatDateToLocaleString = (epoch) => new Date(epoch).toDateString()