import { useState } from "react"
import { auth } from "../App"
import { User } from "firebase/auth"

function Events() {
    const [user] = useState<User>(auth.currentUser!);
    
    return <div>
        Events list
    </div>
}

export default Events