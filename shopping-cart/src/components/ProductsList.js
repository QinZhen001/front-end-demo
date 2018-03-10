import React from 'react'
import ProTypes from 'prop-types'

const ProductsList = ({title, children}) => (
    <div>
        <h3>{title}</h3>
        <div>{children}</div>
    </div>
)


ProductsList.propTypes = {
    children: ProTypes.node,
    title: ProTypes.string.isRequired
}

export default ProductsList