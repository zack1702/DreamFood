import React from 'react';
import { Link } from 'react-router-dom';
 import {useSelector,useDispatch} from 'react-redux'
 import {createCart, removeFromCart} from '../redux/actions/cartAction'
 import {ADD_TO_CART} from '../redux/constants/cartConstants'
import { isAuthenticated } from '../helpers/auth';
const Cart = ({history}) => {
  const dispatch=useDispatch();
    // const cartItems = localStorage.getItem('cart')
	// 	? JSON.parse(localStorage.getItem('cart'))
	// 	: [];

    const {cart}=useSelector(state=>state.cart)
	const {user}=useSelector(state=>state.users)
    const handleGoBack= ()=>{
        history.goBack();
    }
    const handleQtyChange = (e, product) => {
		const cart = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		cart.forEach(cartItem => {
			if (cartItem._id === product._id) {
				cartItem.count = e.target.value;
			}
		});

		localStorage.setItem('cart', JSON.stringify(cart));

		dispatch({
			type: ADD_TO_CART,
			payload: cart,
		});
	};
    const handSubmitCart=(e)=>{
		e.preventDefault()
		if(!isAuthenticated()){
			history.push("/signin")
		}else{
			const userId= user?._id
			const formData= new FormData()
			formData.append('user',userId)
			formData.append('cartItems',cart.product)
			formData.append('total',cart.total)
			
			
			dispatch(createCart(formData))
			history.push('/order')
		}

	}
        
    return (

        <section className='cart-page m-4'>
			{cart.length <= 0 ? (
				<div className='jumbotron'>
					<h1 className='display-4'>
						Your cart is empty{' '}
						<button
							className='btn btn-light text-primary ml-4'
							onClick={handleGoBack}
						>
							Go Back
						</button>
					</h1>
                 </div>
			) : (
				<>
					<div className='jumbotron'>
						<h1 className='display-4'>Cart</h1>
					</div>
					
                    <div className='row'>
                        <div className='col-md-8'>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(product=>(
                                                
                                                <tr key={product._id}>
											    <th scope='row'>
												{' '}
												<img
													style={{
														maxWidth: '110px',
													}}
													className='img-fluid w-100 img-thumbnail'
													src={`/uploads/${product.fileName}`}
													alt='product'
												/>
											    </th>
                                                <td>
                                                    {' '}
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                    >
                                                        {product.product_name}
                                                    </Link>
											    </td>
                                                <td>
												{' '}
												{product.product_price.toLocaleString(
													'en-US',
													{
														style: 'currency',
														currency: 'USD',
													}
												)}
											    </td>
                                                <td>
												<input
													type='number'
													min='1'
													max={product.product_quantity}
													value={product.count}
													onChange={e =>
														handleQtyChange(
															e,
															product
														)
													}
												/>
											</td>
                                            <td>
												{' '}
												<button
													type='button'
													className='btn btn-danger btn-sm'
													onClick={()=>{
                                                        dispatch(removeFromCart(product))
                                                    }
													}
												>
													<i className='far fa-trash-alt pr-1'></i>
												</button>
											</td>
                                                
                                                </tr>
                                            ))}


                                            
                                            
                                        </tbody>
                                        </table>

                        </div>
						<form onSubmit={handSubmitCart}>
                        <div className='col-md-4 border-left pl-4'>
							<h2>Cart Summary</h2>
							<p className='font-weight-light text-muted border-bottom'>
								{cart.length === 1
									? '(1) Item'
									: `(${cart.length}) Items`}
							</p>
							<p className='font-weight-bold' value={cart.total} >
								Total: $
								
								{cart
									.reduce(
										(currentSum, currentCartItem) =>
											currentSum +
											currentCartItem.count *
												currentCartItem.product_price,
										0
									)
									.toFixed(2)}
							</p>
							<button className='btn btn-dark btn-large btn-block mb-5 py-2'
							type="submit">
								Checkout and Order
							</button>
						</div>
					</form>
                    </div>
                </>)}
        </section>            
    )
    
   
   
    
}
export default Cart;