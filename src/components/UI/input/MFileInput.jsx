import React from 'react';
import style from './MFileInput.module.css'

function MFileInput({className, children, maxSize, setError, setShowError, accept, setImage, maxFiles, ...props}) {

    function handleChange(e) {
        let file = e.target.files[0]
        if (file) {
            if (maxSize * 10000000 > file.size)
                setImage(file);
            else
                setError("File is too big")
        }
    }

    function handleChangeMore(e) {
        const files = e.target.files
        let pulFiles = []
        for (let i = 0; i < files.length; i++) {
            if (maxSize * 10000000 > files[i].size)
                pulFiles.push(files[i])
            else
                setError("File is too big")
                setShowError(true)

        }
        setImage(prev => {
            let prevLen = prev.length
            if (prevLen + pulFiles.length > maxFiles) {
                let arr = []
                for (let i = 0; i < maxFiles - prevLen; i++) {
                    arr.push(pulFiles[i])
                }
                setError("More than 10 files")
                setShowError(true)
                return [...prev, ...arr]
            }
            return [...prev, ...pulFiles]
        })
    }



    return (
        <div className={className}>
            <label className={style.label}>
                <input
                    {...props}
                    type="file"
                    accept={accept ? accept : "image/png, image/jpeg, image/gif"}
                    className={style.input}
                    multiple={maxFiles && maxFiles > 1}
                    onChange={maxFiles ? handleChangeMore : handleChange}
                    onClick={ event => {event.target.value = null} }
                />
                {children}
            </label>

        </div>
    )

}

export default MFileInput;