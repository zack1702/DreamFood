import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
// import './VendeurViews.css'
const VendeurBody = () => {
    const { products } = useSelector(state => state.products)
    return (
        <div className='container'>
            <div className='row'>
             <div className='col-sm productsCard '>
                <div className='card-deck '>
                    {products &&
                     products.map(product => (
                        <Card key={product._id} product={product} adminPage={true}/>                
                    ))}
                </div>
             </div>
            </div>
        </div>
    )
}

export default VendeurBody
