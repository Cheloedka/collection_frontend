import React from 'react';
import style from './MFileInput.module.css'

function MFileInput({className, children, maxSize, setError, setImage, ...props}) {

    function handleChange(e) {
        let file = e.target.files[0]
        if (file) {
            if (maxSize * 1000000 > file.size)
                setImage(file);
            else
                setError("File is too big")
        }
    }



    return (
        <div className={className}>
            <label className={style.label}>
                <input
                    {...props}
                    type="file"
                    className={style.input}
                    onChange={handleChange}
                />
                {children}
            </label>

        </div>
    )

}

export default MFileInput;