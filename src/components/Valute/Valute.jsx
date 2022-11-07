import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Valute = ({ item }) => {
    // console.log(item)
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [changed, setChanged] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(1);

    useEffect(() => {
        changeValute();
    }, [changed]);

    const handleChangeValutes = () => {
        setChanged(!changed)
    }

    const changeValute = () => {
        if (changed) {
            setFrom('1 RUB');
            setTo(`${(1 / (item?.Value / item?.Nominal)).toFixed(4)} ${item?.CharCode}`);
            setExchangeRate(1 / (item?.Value / item?.Nominal) - 1 / (item?.Previous / item?.Nominal));
        } else {
            setFrom(`1 ${item?.CharCode}`);
            setTo(`${(item?.Value / item?.Nominal).toFixed(4)} RUB`);
            setExchangeRate((item?.Value - item?.Previous) / item?.Nominal);
        }
    }

    return (
        <div className='list-valute-wrapper-item'>
            <h4>{item.Name}</h4>
            <div className='list-valute-item'>
                <div className='left-item'>
                    {from}
                    <SwapHorizIcon className='swap-icon' variant="text" onClick={handleChangeValutes} />
                    {to}
                </div>
                <div className='left-right'>
                    <span>
                        {exchangeRate.toFixed(3)}
                    </span>
                    {exchangeRate.toFixed(3) > 0 ? <span className='arrowUp'> ↑ </span> : <span className='arrowDown'> ↓ </span>}
                </div>
            </div>
        </div>
    );
};

export default Valute;