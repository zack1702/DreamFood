import React,{useState, Fragment} from 'react'

import isEmpty from 'validator/lib/isEmpty';
//redux useDispatch=fireoff actions,useselector=avoir state from reduxStore
import { useDispatch,useSelector } from 'react-redux';
import {clear_messages} from '../../redux/actions/messageAction'
import { createCategory } from '../../redux/actions/categoryAction';


import { showErrorMsg, showSuccessMsg,showLoading } from '../../helpers/Message'

const ShowCategoryModal = () => {
    //redux globale application state properities
    const {successMsg,errorMsg} = useSelector(state=>state.messages)
    const {loading} = useSelector(state=>state.loading)
    const dispatch = useDispatch()
    const [clientSideErr,setClientSideErr]=useState('')
    const [category, setCategory] = useState('')
    
     
    const handleMessages = (evt) => {
       dispatch(clear_messages())//dispatch(action()) 
    }
     const handleCategoryChange = (evt) => {
         dispatch(clear_messages())
         setCategory(evt.target.value);
     }
     const handleCategorySubmit = (evt) => {
         evt.preventDefault();
         if (isEmpty(category)) {
             setClientSideErr('Please enter a category')
         } else {
             const data = { category }
             dispatch(createCategory(data))
             setCategory('');
         }
     }
    
    return (
    <div id='addCategoryModal' className='modal' onClick={handleMessages}>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
            <div className='modal-content'>
            <form onSubmit={handleCategorySubmit}>
                    <div className='modal-header bg-info text-white'>
                        <h5 className='modal-title'>Add Category</h5>
                        <button className='close' data-dismiss='modal'>
                            <span><i className='fas fa-times'></i></span>
                        </button>
                    </div>
                    <div className='modal-body my-2'>
                        { clientSideErr&& showErrorMsg(clientSideErr) }
                        { errorMsg && showErrorMsg(errorMsg) }
                        { successMsg && showSuccessMsg(successMsg) }
                        {
                            loading? (
                                <div>{showLoading()}</div>
                            ) : (
                                <Fragment>
                                    <label className='text-secondary'>Category</label>
                                    <input type='text' className='form-control' name='category' value={category} onChange={handleCategoryChange}/>
                                </Fragment>
                            )
                        }
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button type='submit' className='btn btn-info'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}
export default ShowCategoryModal 