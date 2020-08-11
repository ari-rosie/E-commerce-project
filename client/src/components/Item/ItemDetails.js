import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

<<<<<<< Updated upstream
import Loading from '../Loading';
import { HEADER_HEIGHT } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, toggleCartModal } from '../../actions';

const ItemDetails = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const items = useSelector(state => state.itemsReducer.items);
    const { itemId } = useParams();
    const [itemData, setItemData] = useState(null);

    const handleAddToCart = (item) => {
        dispatch(addItemToCart(item));
        dispatch(toggleCartModal());
    };

    
    useEffect(() => {
        if (items) {
            setItemData(items.items.find(i => i._id == itemId));
        }
        
    }, [items])
    
    console.log(cartItems)
    return (
        <>
            {itemData ?
            <Wrapper>
                <h2>{itemData.name}</h2>
                <img src={itemData.imageSrc} alt={itemData.name}/>
                <button onClick={() => handleAddToCart(itemData)}>Add to cart</button>
            </Wrapper>
            : <Loading />
            }
        </>
    );
=======
import { fetchData } from "../../handlers";
import Loading from "../Loading";
import { HEADER_HEIGHT } from "../../constants";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetchData(`http://localhost:3000/items/${itemId}`).then((res) =>
      setItemData(res.item)
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {itemData ? (
        <Wrapper>
          <h2>{itemData.name}</h2>
          <img src={itemData.imageSrc} alt={itemData.name} />
          <button>Add to cart</button>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
>>>>>>> Stashed changes
};

const Wrapper = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT};
`;

export default ItemDetails;
