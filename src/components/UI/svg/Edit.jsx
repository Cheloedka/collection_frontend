import React from 'react';

function Edit({color}) {
    return (
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.0417 2.91669H13.125C5.83335 2.91669 2.91669 5.83335 2.91669 13.125V21.875C2.91669 29.1667 5.83335 32.0834 13.125 32.0834H21.875C29.1667 32.0834 32.0834 29.1667 32.0834 21.875V18.9584"
                stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M23.3917 4.40417L11.9 15.8958C11.4625 16.3333 11.025 17.1938 10.9375 17.8208L10.3104 22.2104C10.0771 23.8 11.2 24.9083 12.7896 24.6896L17.1792 24.0625C17.7917 23.975 18.6521 23.5375 19.1042 23.1L30.5958 11.6083C32.5792 9.625 33.5125 7.32084 30.5958 4.40417C27.6792 1.4875 25.375 2.42084 23.3917 4.40417Z"
                stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                d="M21.7438 6.05206C22.2273 7.7692 23.1437 9.33341 24.4052 10.5948C25.6666 11.8563 27.2308 12.7727 28.9479 13.2562"
                stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    );
}

export default Edit;