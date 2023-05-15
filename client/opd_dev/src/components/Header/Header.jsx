import React from "react"
import styles from "./Header.module.scss"
import PurpleButton from "../PurpleButton/PurpleButton"
import GreenButton from "../GreenButton/GreenButton"

const Header = () => {
    return (
        <div className="bg-neutral-100">
            <div className="max-w-screen-xl mx-auto px-2 py-4 flex items-center">
                <a className="text-xl uppercase mr-10" href="/">Logo</a>
                <nav className="flex gap-x-5 mr-auto">
                    <ul className="flex items-center gap-x-5">
                        <li><a className={[styles.navItem, styles.greenLink].join(" ")} href="/">Анализ звонков</a></li>
                        <li><a className={[styles.navItem, styles.greenLink].join(" ")} href="/">Тарифы</a></li>
                        <li><a className={[styles.navItem, styles.greenLink].join(" ")} href="/">Клиентам</a></li>
                        <li><a className={[styles.navItem, styles.greenLink].join(" ")} href="/">Партнерам</a></li>
                        <li><a className={[styles.navItem, styles.greenLink].join(" ")} href="/">Блог</a></li>
                    </ul>
                    <GreenButton>Коллтрекинг</GreenButton>
                    <PurpleButton>Сквозная аналитика</PurpleButton>
                </nav>
                <div className="flex items-center gap-x-5">
                    <a className={["font-bold transition-colors", styles.greenLink].join(" ")} href="tel:+74952368472">
                        +7 (495) 236-84-72
                    </a>
                    <button className={styles.whiteBtn}>Личный кабинет</button>
                </div>
            </div>
        </div>
    )
}

export default Header