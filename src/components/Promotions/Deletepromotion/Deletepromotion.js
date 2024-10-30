import axios from 'axios';
import React from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

function Deletepromotion({fetchpromo, id}) {
    const Deletepromotion = async () => {
        try {
          const response = await axios.delete(
            `https://final-back-1-nk9y.onrender.com/api/promotion/delete/${id}`,
    
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, 
            }
          );
    
        
          await fetchpromo();
          
          toast.success(response.data); 
        } catch (error) {
          console.log(error);
        }
      };
    
      return (
        <>
          <MdDeleteForever onClick={() => Deletepromotion()} />
        </>
      );
}

export default Deletepromotion
