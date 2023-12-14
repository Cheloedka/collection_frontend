import style from "./Creators/CollectionCreator.module.css";
import MInput from "../../../components/UI/input/MInput";
import MTextarea from "../../../components/UI/input/MTextarea";

function CreationInputs({children, tittle, setTitle, about, setAbout, information, setInformation}) {

    const inputs = [
        { value: tittle, onChange: setTitle, placeholder: "Title", maxLength: 20},
        { value: about, onChange: setAbout, placeholder: "About", maxLength: 100}
    ]
    return (
        <div className={style.divAllInputs}>
            <div className={style.divInputs}>
                { inputs.map((c, index) =>
                    <MInput
                        key={index}
                        type="name"
                        value={c.value}
                        onChange={event => c.onChange(event.target.value)}
                        placeholder={c.placeholder}
                        maxLength = {c.maxLength}
                    />
                )}
            </div>

            <div className={style.divInputs}>
                <MTextarea
                    style={{minHeight: "136px"}}
                    value={information}
                    onChange={event => setInformation(event.target.value)}
                    placeholder="Main"
                    maxLength = "500"
                />
            </div>

            {children}
        </div>
    );
}

export default CreationInputs;