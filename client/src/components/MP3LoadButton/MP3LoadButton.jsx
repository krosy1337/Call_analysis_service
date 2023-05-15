import React, {useState} from "react"
import "./MP3LoadButton.css"
import PurpleButton from "../PurpleButton/PurpleButton"

const Mp3UploadButton = ({onAudioChange}) => {
    const [fileName, setFileName] = useState(null)
    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        setFileName(file.name)
        onAudioChange(file)
    }

    return (
        <div className="mb-3">
            <PurpleButton>
                <label className="cursor-pointer" htmlFor="mp3-upload">Загрузить mp3 файл</label>
            </PurpleButton>
            <div
                className={`${fileName ? "" : "hidden"} text-neutral-500 text-xs max-w-[15rem] overflow-hidden overflow-ellipsis`}>{fileName}</div>
            <input
                className="hidden"
                id="mp3-upload"
                type="file"
                accept=".wav"
                onChange={handleFileUpload}
            />
        </div>
    )
}

export default Mp3UploadButton
