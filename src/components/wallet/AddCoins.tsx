import React, { useContext, useState } from "react";
import { ErrorMessage } from "../service/ErrorMessage";
import { updateBalance } from "../../store/Cart.Slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IUser } from "../../models";
import { ModalWindowContext } from "../../context/ModalWindowContext";
import "./Wallet.css"

interface AddCoinsProps {
  onCreate: () => void;
}

export function AddCoins({ onCreate }: AddCoinsProps) {
  const dispatch = useAppDispatch();
  const [debet, setDebet] = useState('');
  const user = useAppSelector((state) => state.user.user);
  const [error, setError] = useState('');
  const { modalWindow, open, close } = useContext(ModalWindowContext);


  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (debet.trim().length === 0) {
      setError('Введите корректное значение');
      return;
    }

    if (user && user._id && user?.credit) {
      const balance = user.credit + Number(debet);
      const formData = new FormData();
      formData.set('_id', user._id);
      formData.set('credit', balance.toString());
      const userData: IUser = {
        _id: formData.get('_id') as string,
        credit: formData.get('credit') ? Number(formData.get('credit')) : undefined,
      };
      if (user && user._id) {
        dispatch(updateBalance(user._id, { ...userData, _id: user._id }));
        close()
      }
    } else {
      console.log('Пользователь не найден');
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.name === 'debet') {
      setDebet(event.target.value);
    }
  };

  return (
    <div className="addCoins-container">
      <form
        className="addCoins-form"
        onSubmit={submitHandler}
      >
        <div className="addCoins-row">
          <p className="addCoins-label">на сумму:</p>
          <input
            className="addCoins-el"
            type="number"
            name="debet"
            value={debet}
            onChange={changeHandler}
          />
        </div>
        {error && <ErrorMessage error={error} />}
        <div className="addCoins-btnBlock">
          <button className="addCoins-btn">Пополнить</button>
        </div>
      </form>
    </div>
  );
}