import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
    return (
        <div>
            {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>} {/*gotoPrevPage && is a check to see if there's a previous page*/}
            {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
        </div>
    )
}
