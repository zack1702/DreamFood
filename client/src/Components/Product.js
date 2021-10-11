// import { Add, Remove } from "@material-ui/icons";

import { useEffect, useState } from "react";
 import { getProduct } from "../redux/actions/productAction";
 import { useDispatch,useSelector } from "react-redux";
import{addProduct} from '../redux/actions/cartAction'

const Product = ({match}) => {
  
    // const productId = location.pathname.split("/")[2];
   
     const {product}=useSelector(state=>state.products)
      const [quantity, setQuantity] = useState(1);
      const [color, setColor] = useState([]);
      const [size, setSize] = useState([]);
     const dispatch = useDispatch();
    const productId=match.params.productId
 
     
      useEffect(() => {
         dispatch(getProduct(productId))
          
    }, [dispatch,productId,product]);
  
     const handleQuantity = (type) => {
       if (type === "dec") {
         quantity > 1 && setQuantity(quantity - 1);
       } else {
         setQuantity(quantity + 1);
       }
     };
     const handleClick = () => {
      dispatch(
        addProduct({ ...product, quantity, color, size })
      );
    };
  
  
    return (
      <div className='col-md-4  my-3'>
        <div className='card h-100'>
             {<a href ='#!'>
                <img className='img-fluid w-100' src={`/uploads/${product?.fileName}`} alt=''/>
            </a>  }
        <div className='card-body text-center'>
                    <h5>{product?.product_name}</h5>
                    <hr/>
                    <h6 className='mb-3'>
                        <span className='text-secondary mr-2'>
                          {product?.product_price}
                      </span>
                  </h6>
                  <p>{product?.product_description} </p>
                  <div className='adding__container'>
                    <input type='button'  name='dec' onClick={() => handleQuantity("dec")} />
                         {quantity}  
                    <input type='button' name='asc' onClick={() => handleQuantity("inc")} />
                    <input type='text'   onChange={(e) => setSize(e.target.value)}/>
                {size?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              
                    {/* <input type='button' onClick={handleClick}/>
                    <select>{product.color?.map((c) => (
                        <option color={c} key={c} onClick={() => setColor(c)} />
                      ))}</select> */}
                
       
         </div>         
      </div>
      </div>
       </div> 
    )
            
  };
  
  export default Product;