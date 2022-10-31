import React from 'react';
import { Link } from 'react-router-dom';

const Path = () => {
    return (
        <div>
            <div className='path'>
                <p><Link to='/converter'>Конвертер</Link></p>
                <p><Link to='/list'>Список валют</Link></p>
            </div>
        </div>
    );
};

export default Path;