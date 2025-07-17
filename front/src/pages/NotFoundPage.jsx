import React from 'react';

export default () => {
    return (
        <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin {
                    animation: spin 2s linear infinite;
                    background-color:purple;
                }
                `}
            </style>
            <img src="card_04.png" className='spin' alt="" srcset="" />
            <h1>Not found</h1>
            <h1>404</h1>
        </div>
    );
}
