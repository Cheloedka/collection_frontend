import React from 'react';

function BooleanDiv({bool, children, ifFalse, ...props}) {
    return (
        <div {...props}>
            { bool
                ? children
                : ifFalse
            }
        </div>
    );
}

export default BooleanDiv;