import { MouseEvent as ReactMouseEvent, PropsWithChildren } from "react";

function Button(props: PropsWithChildren<{onClick?: (ev: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void}>) {
    return <button className="bg-black text-white rounded-sm px-2 py-1 cursor-pointer" onClick={ev => {
        props?.onClick?.(ev)
    }}>
        {props.children}
    </button>
}

export default Button;