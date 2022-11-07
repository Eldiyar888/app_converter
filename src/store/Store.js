import React from 'react';
import axios from 'axios';
import { url } from '../api/api';


export const getUrl = async () => {
    const data = await axios.get(url);
    return data.data.Valute;
}

