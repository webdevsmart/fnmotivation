import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="d-flex justify-content-center p-5">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <Link onClick={() => paginate(number)} className="page-link">
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;