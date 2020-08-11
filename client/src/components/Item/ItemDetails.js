import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Loading from "../Loading";
import { HEADER_HEIGHT } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  toggleCartModal,
  addExistingItemToCart,
} from "../../actions";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const items = useSelector((state) => state.itemsReducer.items);
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);

  const handleAddToCart = (item) => {
    cartItems.findIndex((element) => element._id === item._id) < 0
      ? dispatch(addItemToCart(item))
      : dispatch(addExistingItemToCart(item));

    dispatch(toggleCartModal());
  };
  console.log(cartItems);

  useEffect(() => {
    if (items) {
      setItemData(items.items.find((i) => i._id == itemId));
    }
  }, [items]);

  return (
    <>
      {itemData ? (
        <Wrapper>
          <h2>{itemData.name}</h2>
          <img src={itemData.imageSrc} alt={itemData.name} />
          <button onClick={() => handleAddToCart(itemData)}>Add to cart</button>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT};
`;

export default ItemDetails;
