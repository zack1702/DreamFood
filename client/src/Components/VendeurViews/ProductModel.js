import React,{useState,Fragment} from 'react'
import isEmpty from 'validator/lib/isEmpty';

import { showErrorMsg, showSuccessMsg,showLoading } from '../../helpers/Message'

//redux
import { useDispatch,useSelector } from 'react-redux';
import {clear_messages} from '../../redux/actions/messageAction'
import {createProduct} from '../../redux/actions/productAction'


const ShowProductModal = () => {
    const dispatch = useDispatch()
    const {successMsg,errorMsg}=useSelector(state=>state.messages)
    const {loading}=useSelector(state=>state.loading)
    const {categories}=useSelector(state=>state.categories)
    const [clientSideErr,setClientSideErr]= useState('')
    const [productData,setProductData] = useState({
        product_image:null,
        product_name:'',
        product_description:'',
        product_price:'',
        product_category:'',
        product_quantity:'',
    })
    const {product_image,product_name,product_description,product_price,
        product_category,
        product_quantity}=productData;
       
     const handleProductSubmit = (e) =>{
            e.preventDefault();
            //validation des champs
            if(product_image===null){
                 setClientSideErr('Please select an image')
            }else if(isEmpty(product_name)|| 
            isEmpty(product_description)||
            isEmpty(product_price)){
                setClientSideErr('All fields are required')
            //  }else if(isEmpty(product_category)){
            //    setClientSideErr('Please ')
            }else if(isEmpty(product_quantity)){
                setClientSideErr('Please select a quantity')
            }else{
                let formData=new FormData();
                formData.append('product_image',product_image)
                formData.append('product_name',product_name)
                formData.append('product_description',product_description)
                formData.append('product_price',product_price)
                formData.append('product_category',product_category)
                formData.append('product_quantity',product_quantity)
                
                dispatch(createProduct(formData))
                setProductData({ 
                    product_image:null,
                    product_name:'',
                    product_description:'',
                    product_price:'',
                    product_category:'',
                    product_quantity:'',})
        }}
     const handleMessages = (evt) => {
            dispatch(clear_messages())
            setClientSideErr('')
        }
    const handleProductImage= e =>{
        setProductData({
            ...productData,
            [e.target.name]: e.target.files[0]
        })
    }
    const handleProductChange= e =>{
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        })
    }
    return(
    <div id='addProductModal' className='modal' onClick={handleMessages}>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
            <div className='modal-content'>
            <form onSubmit={handleProductSubmit}>
                    <div className='modal-header bg-warning text-white'>
                        <h5 className='modal-title'>Add Product</h5>
                        <button className='close' data-dismiss='modal'>
                            <span><i className='fas fa-times'></i></span>
                        </button>
                    </div>
                    <div className='modal-body my-2'>
                    { clientSideErr && showErrorMsg(clientSideErr) }
                        { errorMsg && showErrorMsg(errorMsg) }
                        { successMsg && showSuccessMsg(successMsg) }
                        {
                            loading? (
                                <div>{showLoading()}</div>
                            ) : (
                                <Fragment>
                                   <div className="mb-3">
                                        <input className="custom-file mb-2" type="file"  name='product_image'                                   
                                        onChange={handleProductImage}   />
                                    </div>
                                    <div className="mb-3"> 
                                        <input className="form-control" type="text" id="name" placeholder='Product_Name'
                                        onChange={handleProductChange}
                                        name='product_name' value={product_name}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">$</span>
                                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"name='product_price'
                                        onChange={handleProductChange}
                                        value={product_price} />
                                        <span className="input-group-text" >.00</span>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text">Description</span>
                                        <textarea className="form-control" aria-label="With textarea" 
                                        onChange={handleProductChange}
                                        name='product_description' value={product_description}></textarea>
                                    </div>
                                    
                                    <div className='form-row'>
                                    
                                         <select value={product_category} name='product_category' onChange={handleProductChange} aria-label=".form-select-sm example">
                                            {categories && categories.map( (e) => ( 
                                                <option name='product_category'
                                                 key={e._id} 
                                                
                                                value={e.product_category}
                                                onChange={handleProductChange} 
                                                 >
                                                {e.category}
                                                </option>    
                                            ))}
                                    </select>
                                    <div className='form-group col-md-6'>
                                        <label className='text-secondery'>
                                            Quantity
                                        </label>
                                        <input type='number' className='form-control' min='0' 
                                        onChange={handleProductChange}
                                        name='product_quantity' value={product_quantity}/>

                                    </div>

                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button type='submit' className='btn btn-warning text-white'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}
export default ShowProductModal