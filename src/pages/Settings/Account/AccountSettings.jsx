import React from 'react';
import style from './AccountSettings.module.css'
import Edit from "../../../components/UI/svg/Edit";

function AccountSettings({userImage}) {

    return (
        <div>
            <div className={style.divImages}>
                <img src={userImage} className={style.userImageBig}/>
                <div className={style.divSmImage}>
                    <img src={userImage} className={style.userImageSm}/>
                    <div className={style.borderedButton}>
                        <Edit color='#3A325B'/>Choose image
                    </div>
                </div>
            </div>

            <div>
                Change Name
            </div>
            <div>
                Change Surname
            </div>
        </div>
    );
}

export default AccountSettings;