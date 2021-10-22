 import { Add, Remove } from "@material-ui/icons";
//  import './Product.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
 import { getProduct } from "../redux/actions/productAction";
 import { useDispatch,useSelector } from "react-redux";
import{addToCart} from '../redux/actions/cartAction'
import { isAuthenticated } from "../helpers/auth";

const Product = ({match,history}) => {
  
    // const productId = location.pathname.split("/")[2];
   
     const {product}=useSelector(state=>state.products)
      const [quantity, setQuantity] = useState(1);
     const dispatch = useDispatch();
    const productId=match.params.productId
 
     
      useEffect(() => {
         dispatch(getProduct(productId))
    }, [dispatch,productId]);

    const handleGoBack= () =>{
      history.push("/")
    }
    const handleAddToCart = () => {
      dispatch(addToCart(product,quantity));
      history.push('/shop')
    };
    
     const handleQuantity = (type) => {
       if (type === "dec") {
         quantity > 1 && setQuantity(quantity - 1);
       } else {
         setQuantity(quantity + 1);
       }
     };
  
  
    return (
      <div className='container'>
     
          <button className="btn btn-light text-primary"
          onClick={handleGoBack}>
          Go Back
          </button>
          <div className='card'>
            <div className='productImg'>
                <img className='img-fluid w-100 'id='img' src={`/uploads/${product?.fileName}`} alt=''/>
            </div>
            <div className='details'>
                      <h5>{product?.product_name}</h5>
                      <hr/>
                      <h6 className='mb-3'>price
                        <span className='text-secondary mr-2'>
                          {product?.product_price}
                      </span>
                  </h6>
                  <p>{product?.product_description} </p>
                  <div className='adding__container'>
                    <h6> Quantity</h6>
              
                    <input type='button' placeholder="_" name='dec' onClick={() => handleQuantity("dec")} />
                       <input type='text' value={quantity}  />
                      
                    <input type='button' placeholder="+" name='asc' onClick={() => handleQuantity("inc")} />
                <button className='btn btn-dark btn-large btn-block mb-5 py-2'
                                disabled={product?.product_quantity <= 0}
                                onClick={handleAddToCart}
                              >
                                Add to Cart
                              </button>
               </div>         
      </div>
      </div>
     
       </div>
    )
            
  };
  
  export default Product;