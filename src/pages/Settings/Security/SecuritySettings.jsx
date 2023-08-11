import React from 'react';
import MInputWithText from "../../../components/UI/input/MInputWithText";
import style from "./SecuritySettings.module.css";
import SettingsEditButton from "../../../components/UI/button/SettingsEditButton";

function SecuritySettings() {



    return (
        <>
        <div className={style.divCenter}>
            <MInputWithText
                type="name"
                style={{width: "445px"}}
                placeholder={"Change Username"}
            />
            <MInputWithText
                type="name"
                style={{width: "445px"}}
                placeholder={"Change Email"}
            />
            <MInputWithText
                type="name"
                style={{width: "445px"}}
                placeholder={"Change Password"}
            />
        </div>
        <div className={style.saveChanges}>
            <button>
                <SettingsEditButton style={{borderColor: "red", color: "red"}} text={"Delete Account"}>
                    {/*{isLoading*/}
                    {/*    ?<MainLoader />*/}
                    {/*    :<>Save Changes</>*/}
                    {/*}*/}
                </SettingsEditButton>
            </button>
        </div>
        <div>
            {/*{errorMessage*/}
            {/*    ? <Alert className="alert-danger"><strong>Error: </strong>{errorMessage}</Alert>*/}
            {/*    : <></>*/}
            {/*}*/}
        </div>
        </>
    );
}

export default SecuritySettings;