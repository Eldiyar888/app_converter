import React from 'react';

const Pagination = ({ valutesPerPage, totalValutes, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalValutes / valutesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination'>
            <div className='pagination-wrapper'>
                {
                    pageNumbers.map(number => (
                        <li>
                            <a href='#' onClick={() => paginate(number)}> {number} </a>
                        </li>
                    ))
                }
            </div>
        </div>
    );
};

export default Pagination;