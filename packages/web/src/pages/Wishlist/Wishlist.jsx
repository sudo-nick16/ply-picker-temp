import React, { useEffect, useState } from 'react'
import { API_URL } from '../../constants';
import useAxios from '../../utils/useAxios'

const Wishlist = () => {
    const api = useAxios();
    const [wishlist, setWishlist] = useState([]);

    const removeFromWishlist = async (id) => {
        try{
            const res = await api.delete(`${API_URL}/wishlist/${id}`);
            if (res.data.error) {
                alert(res.data.error);
            } else {
                alert("Removed from wishlist");
                setWishlist(wishlist.filter((item) => item._id !== id));
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(async () => {
        try{
            const res = await api.get(`${API_URL}/wishlist`);
            if(!res.data.error){
                console.log(res.data);
                setWishlist(res.data);
            }else{
                alert(res.data.error);
            }
        }catch(err){
            alert(err);
        }
    },[])

  return (
      <>
      <h2>Wishlist</h2>
      {
            wishlist.map((item) => {
                return (
                    <div key={item._id}>
                        <img src={item.Product_Image} width="100" height="100" alt="" />
                        <h4>{item.Product_Name}</h4>
                        <p>{item.Product_Description}</p>
                        <h5>Rs {item.Product_Price}</h5>
                        <button onClick={() => removeFromWishlist(item._id)}>Remove from wishlist</button>
                    </div>
                )
            })
      }
      </>
  )
}

export default Wishlist