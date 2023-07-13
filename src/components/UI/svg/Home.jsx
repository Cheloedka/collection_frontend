import React from 'react';

function Home({height, width}) {
    return (
        <svg width={width ?width :"23px"} height={height ?height :"23px"} viewBox="0 0 35 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.5 27.758V23.1796M13.1542 4.63668L5.29374 11.0466C3.98124 12.1149 2.91666 14.3889 2.91666 16.1134V27.4223C2.91666 30.963 5.67291 33.8627 9.05624 33.8627H25.9437C29.3271 33.8627 32.0833 30.963 32.0833 27.4376V16.3271C32.0833 14.4804 30.9021 12.1149 29.4583 11.0618L20.4458 4.45354C18.4042 2.95791 15.1229 3.03421 13.1542 4.63668Z"
                stroke="#3A325B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default Home;