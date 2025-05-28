import { User } from "firebase/auth";
import { PropsWithChildren, useState } from "react";
import { auth } from "../main";
import { IEvents } from "../vite-env";

function Events(props: { data: IEvents[] }) {
    const [user] = useState<User>(auth.currentUser!);

    console.log('data:', props.data)

    return <div className="grid grid-cols-4 gap-8 w-full">
        {props.data.map(({ name, location, created_by, created_at }) => {
            return <div className="border border-gray-600 w-full p-4">
                <h4 className="">{name.replace('name of customer', 'Event Name')}</h4>
                <h5>{location}</h5>
                <h5>{created_by}</h5>
                <h5>{created_at}</h5>
            </div>
        })}
    </div>
}

export default Events