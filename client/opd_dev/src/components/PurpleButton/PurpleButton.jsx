import React from "react"
import styles from "./PurpleButton.module.css"

const PurpleButton = ({className, ...props}) => {
    return (
        <button className={[styles.purpleBtn, className].join(" ")} {...props}>
            {props.children}
        </button>
    )
}

export default PurpleButton