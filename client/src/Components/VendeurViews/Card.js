import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteProduct} from '../../redux/actions/productAction'
import { Link } from 'react-router-dom'
const Card = ({product, homePage=false, adminPage= false}) => {
    const dispatch= useDispatch();
    return (
        <div className='col-md-4  my-3'>
            <div className='card h-100'>
                <a href ='#!'>
                    <img className='img-fluid w-100' src={`/uploads/${product.fileName}`} alt=''/>
                </a>
                    <div className='card-body text-center'>
                        <h5>{product.product_name}</h5>
                        <hr/>
                        <h6 className='mb-3'>
                            <span className='text-secondary mr-2'>
                                {product.product_price.toLocaleString('en-US',{
                                    style:'currency',
                                    currency:'USD'
                                })}
                            </span>
                        </h6>
                        <p>{product.product_description.lenght>60
                        ? product.product_description.substring(0,40) +'...'
                        : product.product_description.substring(0,40)} </p>
                        
                        {adminPage &&
                                <>
                                <Link to ={`/admin/edit/product/${product._id}`} 
                                type='button' className='btn btn-danger btn-sm mr-1 my-1'>
                                        <i className='far fa-edit pr-1'></i>
                                        Edit
                                </Link>
                                <button type='button' className='btn btn-secondary btn-sm mr-1 my-1' onClick={()=>dispatch(deleteProduct(product._id))}>
                                        <i className='far fa-trash-alt pr-1'></i>
                                    Delete
                                </button>
                                </> 
                        }
                        {homePage &&
                                <>
                                <Link to ={`/product/${product._id}`} //link to Product componnent
                                type='button' className='btn btn-primary btn-sm mr-1 my-1'>
                                       View Product
                                </Link>
                                
                                <button type='button' className='btn btn-warning btn-sm mr-1 my-1' >                                      
                                    Add to Cart 
                                </button> 
                                </> 
                        }
                    </div>
            </div>
        </div>

                    
    )           
}

export default Card
