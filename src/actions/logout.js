//rrd imports
import { redirect } from "react-router-dom";

//helper functions
import { deleteItem } from "../../helpers";

//library imports
import { toast } from "react-toastify";

export async function logoutAction() {
  //delete user
  deleteItem({
    key: "userName"
  })

  //delete note
  deleteItem({
    key: "notes"
  })
  
  toast.success("You've deleted your account")

  return redirect("/")
}