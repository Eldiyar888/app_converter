import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Valute from '../Valute/Valute';
import Pagination from '../Pagination/Pagination';
import { getUrl } from '../../store/Store';

const ListValute = () => {
    const [valute, setValute] = useState({});
    const [error, setError] = useState(null);
    const [findName, setFindName] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [valutesPerPage] = useState(5);


    const handleFindName = (event) => {
        setFindName(event.target.value);
    };

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setValute(data.Valute);
                // console.log(data)
            })
            .catch(error => {
                setError(error);
            })
    }, []);

    let arr = [];

    for (let val in valute) {
        arr.push(valute[val])
    }

    let find = arr.filter((elem) => {
        return elem.Name.toLowerCase().includes(findName.toLowerCase()) || elem.CharCode.toLowerCase().includes(findName.toLowerCase())
    })

    const lastValuteIndex = currentPage * valutesPerPage;
    const firstValuteIndex = lastValuteIndex - valutesPerPage;
    const currentValute = find.slice(firstValuteIndex, lastValuteIndex)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <div className='list-valute'>
                <div className='find-name'>
                    <TextField
                        required
                        className='list-valute-textfield'
                        id="filled-required"
                        label="Поиск валюты"
                        defaultValue="Hello World"
                        variant="filled"
                        value={findName}
                        onChange={handleFindName}
                    />
                </div>
                {currentValute.length > 0 ? currentValute.map(item => (
                    <Valute item={item} />
                )) : `Ничего не найдено`}
                <Pagination
                    valutesPerPage={valutesPerPage}
                    totalValutes={find.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default ListValute;