import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ crumbs }) => {
    if (!crumbs || crumbs.length <= 1) {
        return null
    }

    const currentRoute = {
        color: '#afafaf',
        fontSize: '.9em'
    }
    const previousRoute = {
        paddingRight: 5,
        fontSize: '.9em'
    }

    return (
        <div style={{ marginBottom: 5 }}>
            {/* Link back to any previous steps of the breadcrumb. */}
            {crumbs.map(({ name, path }, key) =>
                key + 1 === crumbs.length ? (
                    <span key={key} style={currentRoute}>
                        {name}
                    </span>
                ) : (
                    <Link key={key} to={path} style={previousRoute}>
                        {name} { '>' }
                    </Link>
                )
            )}
        </div>
    )
}

export default Breadcrumbs