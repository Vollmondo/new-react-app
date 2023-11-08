import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import "../cart/CartLink.css";

export function Wallet() {
  const user = useAppSelector((state) => state.user?.user);
  const Coins = user?.credit

  return (
    <Link to="/userProfile/cart" className="link">
      <span id="walletValue" className="text">&nbsp;{Coins}</span>
    </Link>
  );
}