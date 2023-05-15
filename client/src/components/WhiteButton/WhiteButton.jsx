import React from "react"
import styles from "./WhiteButton.module.css"

const WhiteButton = ({className, ...props}) => {
    return (
        <button className={[styles.whiteBtn, className].join(" ")} {...props}>
            {props.children}
        </button>
    )
}

export default WhiteButton