import React, {useMemo, useState} from "react"
import Header from "../../components/Header/Header"
import Table from "../../components/Table/Table"
import MP3LoadButton from "../../components/MP3LoadButton/MP3LoadButton"
import Modal from "../../components/Modal/Modal"
import PurpleButton from "../../components/PurpleButton/PurpleButton"
import Select from "react-select"
import GreenButton from "../../components/GreenButton/GreenButton"

const HomePage = () => {
    const columns = useMemo(
        () => [
            {
                Header: "id",
                accessor: "id",
            },
            {
                Header: "ФИО",
                accessor: "name",
            },
            {
                Header: "Количество звонков",
                accessor: "calls",
            },
            {
                Header: "Результативность",
                accessor: "result",
            },
        ],
        []
    )

    const data = useMemo(
        () => [
            {
                id: 1,
                name: "Иван Иванов",
                calls: 10,
                result: "80%",
            },
            {
                id: 2,
                name: "Петр Петров",
                calls: 15,
                result: "75%",
            },
            {
                id: 3,
                name: "Анна Сидорова",
                calls: 8,
                result: "90%",
            },
            {
                id: 4,
                name: "Мария Кузнецова",
                calls: 20,
                result: "70%",
            },
            {
                id: 5,
                name: "Владимир Иванов",
                calls: 12,
                result: "85%",
            },
            {
                id: 6,
                name: "Елена Петрова",
                calls: 18,
                result: "80%",
            },
            {
                id: 7,
                name: "Игорь Сидоров",
                calls: 6,
                result: "95%",
            },
            {
                id: 8,
                name: "Ольга Кузнецова",
                calls: 16,
                result: "75%",
            },
            {
                id: 9,
                name: "Артём Иванов",
                calls: 14,
                result: "90%",
            },
            {
                id: 10,
                name: "Александра Петрова",
                calls: 9,
                result: "85%",
            },
        ],
        []
    )

    const options = useMemo(() => data.map(({id, name}) =>
        ({value: id, label: name})), [data])

    const [open, setOpen] = useState(false)
    const [currentClient, setCurrentClient] = useState(null)
    const [currentAudio, setCurrentAudio] = useState(null)

    const onAudioChange = (file) => {
        setCurrentAudio(file)
        console.log(file)
    }

    return (
        <>
            <Header/>
            <div className="max-w-screen-xl mx-auto pt-10">
                <PurpleButton className="mb-4" onClick={() => setOpen(true)}>
                    Загрузить аудио
                </PurpleButton>
                <Table columns={columns} data={data}/>
            </div>
            <Modal isOpen={open} onClose={() => {
                setOpen(false)
            }}>
                <div>
                    <h3 className="text-xl text-center mb-5 font-bold">Загрузка аудио</h3>
                    <Select className="w-60 mb-4" options={options} placeholder="Выберите сотрудника"
                            onChange={(newValue) => {
                                setCurrentClient(newValue)
                            }}/>
                    <MP3LoadButton onAudioChange={onAudioChange}/>
                    <GreenButton disabled={!Boolean(currentClient) || !Boolean(currentAudio)} onClick={() => {
                        setOpen(false)
                        console.log(currentClient, currentAudio)
                        setCurrentAudio(null)
                        setCurrentClient(null)
                    }}>
                        Отправить
                    </GreenButton>
                </div>
            </Modal>
        </>
    )
}

export default HomePage