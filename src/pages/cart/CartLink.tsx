import React from "react";
import { Link } from "react-router-dom";
import "./CartLink.css";
import { getNumItems, getMemoizedNumItems } from "../../store/Cart.Slice";
import { useAppSelector } from "../../store/hooks";

export function CartLink() {
    const NumItems = useAppSelector(getMemoizedNumItems)
  return (
    <Link to="/userProfile/cart" className="link">
      <span className="text">&nbsp;{NumItems ? NumItems:''}</span>
    </Link>
  );
}