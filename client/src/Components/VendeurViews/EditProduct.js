import React,{useState,useEffect,Fragment} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getProduct } from '../../redux/actions/productAction'
import {getCategories} from '../../redux/actions/categoryAction'
import Header from './Header'
import { useHistory } from 'react-router'
import {Link} from 'react-router-dom'
import axios from 'axios'
//import {useParams} from 'react-router-dom'
const EditProduct = ({ match }) => {
    //PARAMS
    const productId=  match.params.productId
    //const productId= useParams();
    //redux global state
    const history = useHistory()
    const dispatch = useDispatch();
    const {product} = useSelector(state =>state.products)
    const {categories} = useSelector(state =>state.categories)
    //const {messages} = useSelector(state =>state.messages)
    console.log(productId)
    //componnent state properities
    const [product_image,setProduct_image]=useState('')
    const [product_name,setProduct_name]=useState('')
    const [product_description,setProduct_description]=useState('')
    const [product_price,setProduct_price]=useState('')
    const [product_quantity,setProduct_quantity]=useState('')
    const [product_category,setProduct_category]=useState('')
    
    
    //dispatch action on willMonth 
    //lifecycle methodes
    useEffect(() => {
        if(!product){
            dispatch(getProduct(productId))
            dispatch(getCategories())}
        else{
            setProduct_image(product.fileName)
            setProduct_name(product.product_name)
            setProduct_description(product.product_description)
             setProduct_price(product.product_price)
             setProduct_category(product.product_category)
            setProduct_quantity(product.product_quantity)
        }
        
    }, [dispatch,productId,product]);

    //event handlers
     const handleImageUpload = e =>{
         const image = e.target.files[0]
         setProduct_image(image)
     }

     const handleProductSubmit = async e =>{
       e.preventDefault() 
       const formData = new FormData();
       formData.append('product_image',product_image)
       formData.append('product_name',product_name)
       formData.append('product_price',product_price)
       formData.append('product_description',product_description)
       formData.append('product_category',product_category)
       formData.append('product_quantity',product_quantity)
        const config={
            headers:{
                'Content-Type':'multipart/frorm-data'
            }
        }
       await axios.put(`/api/product/${productId}`,formData,config)
        .then(res =>{
           
            history.push('/admin/dashboard')
        }).catch(err =>{console.log(err)})
    }

    return (
        <Fragment>
        <Header />
        <div className='container my-3'>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <Link to='/admin/dashboard'>
                        <span className='fas fa-arrow-left'>Go Back</span>
                    </Link>
                    <div>
                        <br />
                        <div className='modal-content'>
                            <form onSubmit={handleProductSubmit}>
                                <div className='modal-header bg-warning text-white'>
                                    <h5 className='modal-title'>
                                        Update Food
                                    </h5>
                                </div>
                                <div className='modal-body my-2'>
                                    <Fragment>
                                        <label className='btn btn-dark mr-4'>
                                            Choose file
                                            <input
                                                type='file'
                                                name='product_image'
                                                accept='images/*'
                                                hidden
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                        {product_image &&
                                           product_image.name ? (
                                            <span className='badge badge-secondary'>
                                                {product_image.name}
                                            </span>
                                        ) : product_image ? (
                                            <img
                                                className='img-thumbnail'
                                                style={{
                                                    width: '120px',
                                                    height: '80px',
                                                }}
                                                src={`/uploads/${product_image}`}
                                                alt='product'
                                            />
                                        ) : null}

                                        <div className='form-group'>
                                            <label className='text-secondary'>
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='product_name'
                                                value={product_name}
                                                onChange={e =>
                                                    setProduct_name(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label className='text-secondary'>
                                                Description
                                            </label>
                                            <textarea
                                                className='form-control'
                                                rows='3'
                                                name='product_description'
                                                value={product_description}
                                                onChange={e =>
                                                    setProduct_description(
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label className='text-secondary'>
                                                Price
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='product_price'
                                                value={product_price}
                                                onChange={e =>
                                                    setProduct_price(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='form-row'>
                                            <div className='form-group col-md-6'>
                                                <label className='text-secondary'>
                                                    Category
                                                </label>
                                                <select
                                                    className='custom-select mr-sm-2'
                                                    name='product_category'
                                                    value={product_category}
                                                    onChange={e =>
                                                        setProduct_category(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        Choose one...
                                                    </option>
                                                    {categories &&
                                                        categories.map(
                                                            c => (
                                                                <option
                                                                    key={
                                                                        c._id
                                                                    }
                                                                    value={
                                                                        c._id
                                                                    }
                                                                >
                                                                    {
                                                                        c.category
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>

                                            <div className='form-group col-md-6'>
                                                <label className='text-secondary'>
                                                    Quantity
                                                </label>
                                                <input
                                                    type='number'
                                                    className='form-control'
                                                    min='0'
                                                    max='1000'
                                                    name='product_quantity'
                                                    value={product_quantity}
                                                    onChange={e =>
                                                        setProduct_quantity(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                </div>
                                <div className='modal-footer'>
                                    <button
                                        type='submit'
                                        className='btn btn-warning text-white'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
);
};
    


export default EditProduct
