import React, {useMemo, useState} from "react"
import Header from "../../components/Header/Header"
import Table from "../../components/Table/Table"
import MP3LoadButton from "../../components/MP3LoadButton/MP3LoadButton"
import Modal from "../../components/Modal/Modal"
import PurpleButton from "../../components/PurpleButton/PurpleButton"
import Select from "react-select"
import GreenButton from "../../components/GreenButton/GreenButton"
import axios from "axios"

const HomePage = ({workers}) => {
    const columns = useMemo(
        () => [
            {
                Header: "id",
                accessor: "ID",
            },
            {
                Header: "ФИО",
                accessor: "Fullname",
            },
            {
                Header: "Количество звонков",
                accessor: "Calls",
            },
            {
                Header: "Результативность",
                accessor: "Performance",
            },
        ],
        []
    )

    const options = useMemo(() => workers.map(({ID, Fullname}) =>
        ({value: ID, label: Fullname})), [workers])

    const [open, setOpen] = useState(false)
    const [currentClient, setCurrentClient] = useState(null)
    const [currentAudio, setCurrentAudio] = useState(null)

    const onAudioChange = (file) => {
        if (file) {
            setCurrentAudio(file)
        }
    }

    const onSubmit = () => {
        if (currentAudio && currentClient) {
            let formData = new FormData()
            formData.append("file", currentAudio)

            axios.post(`/upload/${currentClient.value}`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })

            setOpen(false)
            console.log(currentClient, currentAudio)
            setCurrentAudio(null)
            setCurrentClient(null)
        }
    }

    return (
        <>
            <Header/>
            <div className="max-w-screen-xl mx-auto pt-10">
                <PurpleButton className="mb-4" onClick={() => setOpen(true)}>
                    Загрузить аудио
                </PurpleButton>
                <Table columns={columns} data={workers}/>
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
                    <GreenButton disabled={!Boolean(currentClient) || !Boolean(currentAudio)} onClick={onSubmit}>
                        Отправить
                    </GreenButton>
                </div>
            </Modal>
        </>
    )
}

export default HomePage