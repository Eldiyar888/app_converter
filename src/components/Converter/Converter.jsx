import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { store } from '../../store/Store/Store';
import Switch from '@mui/material/Switch';


const Converter = () => {
    const [valute, setValute] = useState({});
    const [error, setError] = useState(null);
    const [currentValuteFirst, setCurrentValuteFirst] = useState(['USD']);
    const [currentValuteSecond, setCurrentValuteSecond] = useState(['KGS']);

    const [valueFirst, setValueFirst] = useState();
    const [valueSecond, setValueSecond] = useState();

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleChangeFirst = (event) => {
        setCurrentValuteFirst(event.target.value);
    };

    const handleChangeSecond = (event) => {
        setCurrentValuteSecond(event.target.value);
    };

    const handleChangeFirstValue = (event) => {
        setValueFirst(event.target.value);
    };

    const handleChangeSecondValue = (event) => {
        setValueSecond(event.target.value);
    };

    let arr = [];

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setValute(data.Valute);
            })
            .catch(error => {
                setError(error);
            })
    }, []);

    for (let val in valute) {
        arr.push(valute[val])
    }

    let resSecond;

    let convert = () => {
        resSecond = ((valueFirst * (valute[currentValuteFirst]?.Value / valute[currentValuteFirst]?.Nominal) / (valute[currentValuteSecond]?.Value / valute[currentValuteSecond]?.Nominal))).toFixed(4);
    }

    convert();

    let flip = () => {
        let temp = currentValuteFirst;
        setCurrentValuteFirst(currentValuteSecond);
        setCurrentValuteSecond(temp);
    }

    return (
        <div>
            <div className='list-valute-wrapper'>
                <div className='valute-wrapper'>
                    <div className='first-block-wrapper'>
                        <div className='item-title'>
                            <h3>{valute[currentValuteFirst]?.Name}</h3>
                        </div>
                        <div className='item-first'>
                            <TextField fullWidth
                                id="filled-number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                value={valueFirst}
                                onChange={handleChangeFirstValue}
                            />
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={currentValuteFirst}
                                    onChange={handleChangeFirst}
                                >
                                    {arr.map((item) => (
                                        <MenuItem value={item.CharCode} key={item.ID}>
                                            {item.CharCode}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <Switch {...label} onClick={flip} />
                    <div className='second-block-wrapper'>
                        <div className='item-title'>
                            <h3>{valute[currentValuteSecond]?.Name}</h3>
                        </div>
                        <div className='item-second'>
                            <TextField fullWidth
                                id="filled-number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                value={resSecond}
                                onChange={handleChangeSecondValue}
                            />
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={currentValuteSecond}
                                    onChange={handleChangeSecond}
                                >
                                    {arr.map((item) => (
                                        <MenuItem value={item.CharCode} key={item.ID}>
                                            {item.CharCode}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Converter;