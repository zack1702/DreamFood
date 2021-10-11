import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
//redux
import { getCategories } from '../redux/actions/categoryAction';
import { getProducts } from '../redux/actions/productAction';

import Header from '../Components/VendeurViews/Header'
import ActionButton from '../Components/VendeurViews/ActionButton'
import CategoryModel from '../Components/VendeurViews/CategoryModel'
import ProductModel from '../Components/VendeurViews/ProductModel'
import VendeurBody from '../Components/VendeurViews/VendeurBody'


const VendeurProfile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
      }, [dispatch])
      useEffect(() => {
        dispatch(getProducts())
      }, [dispatch])
    return (
        <section>
            <Header />
            <ActionButton />
            <CategoryModel />
            <ProductModel /> 
            <VendeurBody /> 
    </section>
    )
}

export default VendeurProfile
