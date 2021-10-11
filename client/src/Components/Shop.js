import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Card from './VendeurViews/Card'
import {getProductsByCount} from '../redux/actions/productAction'
import {getProductsByFilter} from '../redux/actions/filterAction'
import {getCategories} from '../redux/actions/categoryAction'
const Shop = () => {
const dispatch = useDispatch()
const {products} = useSelector(state=>state.products)
const {categories} = useSelector(state=>state.categories)
const [text,setText]=useState('')
const [categoryIds,setCategoryIds]=useState([])
useEffect(() => {
    dispatch(getProductsByCount())
}, [dispatch])
useEffect(() => {
    dispatch(getCategories())
}, [dispatch])

const handleSearch =e =>{
    e.preventDefault()
    resetState()
    setText(e.target.value)
    dispatch(getProductsByFilter({type: 'text', query:e.target.value}))
}
const handleCategory =e => {
    resetState()
    const allCategoriesChecked = [...categoryIds]
    const currentCategoryChecked = e.target.value
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked)
    let updatedCategoryIds;
    if (indexFound===-1){
        updatedCategoryIds=[...categoryIds,currentCategoryChecked]
        setCategoryIds(updatedCategoryIds)
    }else{
        updatedCategoryIds =[...categoryIds]
        updatedCategoryIds.splice(indexFound,1)
        setCategoryIds(updatedCategoryIds)
    }
    dispatch(getProductsByFilter({type: 'category', query:updatedCategoryIds}))
}
 const resetState = ()=> {
    setText('')
    setCategoryIds([])
 }

    return (
        <section className='shop-page  m-3'>
            <div className='jumbotron'>
                 <h1 className='display-4'>Shop</h1>
            </div>
            <div className='row'>
                <div className='col-md-3 border-right'>
                   <div className='test-muted mb-2'>
                    Filters <span className='fas fa-sliders-h'></span>
                    </div>
                    <nav className='navbar navbar-expand-lg navbar-light bg-light p-3 border-top'>
                        <form className='form-inline my-2 my-lg-0'>
                            <input className='form-control mr-sm-2'
                            type='search'
                            name='search'
                            value={text}
                            onChange={handleSearch}
                            placeholder='Search'
                            aria-label='Search'
                            />
                            
                             <button className='btn btn-outline-success my-2 my-sm-0'
                             type='submit'
                             disabled={true}> Search
                            </button>   
                        </form>
                    </nav>
                    <div>
                        {categories && categories.map(c =>(
                            <div key={c._id} className="form-check">
                            <input className="form-check-input" 
                            name='category'
                            checked={categoryIds.includes(c._id)}
                            type="checkbox" value={c._id} 
                            onChange={handleCategory}
                            id="flexCheckChecked"  />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              {c.category}
                            </label>
                          </div>
                        ))}
                    </div>
                
                </div>
                <div className='col-md-9'>
                    <div className='row'>
                    {products && products.map(p => (
                        <Card key={p._id} product={p} homePage={true} />
                    ))
                    }

                </div>

            </div>
            </div>
        </section>
    )
}

export default Shop
