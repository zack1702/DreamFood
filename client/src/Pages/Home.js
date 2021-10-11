import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getNewArrivals} from '../redux/actions/filterAction'
import {getProducts} from '../redux/actions/productAction'
import Card from '../Components/VendeurViews/Card'

import {showLoading} from '../helpers/Message'
const Home = () => {
    const dispatch = useDispatch();
    const {newArrivals}= useSelector(state => state.filters)
    const {loading}= useSelector(state => state.loading)
    const { products } = useSelector(state => state.products);
    
    useEffect(() => {
       dispatch(getNewArrivals())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProducts())
     }, [dispatch]);

    return (

        <section className='home-page'>
			
            <div className='banner-image'>
            
            {loading ? (
				<div className='text-center'>{showLoading()}</div>
			) : (
				<>
					<div className='container'>
						<hr className='py-4' />
						<h3 className='py-4'>New Arrivals</h3>
						<div className='row'>
							{newArrivals &&
								newArrivals.map(newArrival => (
									<Card
										key={newArrival._id}
										product={newArrival}
										homePage={true}
									/>
								))}
						</div>

						<hr className='py-4' />
						<h3 className='py-4'>Menu</h3>
						<div className='row'>
							{products &&
								products.map(product => (
									<Card
										key={product._id}
										product={product}
										homePage={true}
									/>
								))}
						</div>
					</div>
				</>
			)}
          </div>  
		</section>
	);
};


export default Home
