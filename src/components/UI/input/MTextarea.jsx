import React from 'react';
import style from "./MTextarea.module.css";

function MTextarea({placeholder, length, ...props}) {
    return (
        <div className="form-floating">
            <textarea
                { ...props}
                className={style.MTextarea + " form-control"}
            >
            </textarea>
            <label>
                { length <= 60
                    ?<>{placeholder}</>
                    :<></>
                }
            </label>
        </div>
    );
}

export default MTextarea;