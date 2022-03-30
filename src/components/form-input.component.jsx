import React from 'react';

export default function FormInput() {
    return (
        <>
            <label htmlFor="username" className='block text-lg font-medium text-gray-600'>Username</label>
            <input type="text" name="username"
                className='focus:border-blue-600 block border-transparent outline-none border-2 rounded-md' />
        </>
    );
}