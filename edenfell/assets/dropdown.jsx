import React from 'react';

export default function Dropdown({expandMenu}) {
    return (
        <div className='dropdown-div' onClick={expandMenu}>
            <button className="dropdown-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 0 180 100">
                    <path d="M10 0 180 0C190 10 180 20 180 20L10 20C0 10 10 0 10 0ZM10 40 180 40C190 50 180 60 180 60L10 60C0 50 10 40 10 40ZM10 80 180 80C190 90 180 100 180 100L10 100C0 90 10 80 10 80Z" fill="#FFF"></path>
                </svg>
            </button>
        </div>
    );
};