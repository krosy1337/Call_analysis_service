import React from "react"
import styles from "./GreenButton.module.css"

const GreenButton = ({className, ...props}) => {
    return (
        <button className={[styles.greenBtn, className].join(" ")} {...props}>
            {props.children}
        </button>
    )
}

export default GreenButton