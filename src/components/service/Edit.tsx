import React, { useContext, useState } from "react";
import { ModalWindow } from "./ModalWindow";
import { ModalWindowContext } from "../../context/ModalWindowContext";

interface EditProps {
  object: { [key: string]: any };
  headers: string[];
}

export function Edit({ object, headers }: EditProps) {
  const { modalWindow, open, close } = useContext(ModalWindowContext);
  const [fields, setFields] = useState<{ [key: string]: any }>(object);

  function editHandler(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
    console.log(fields);
    open();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  }

  return (
    <>
      <img className="admin-table-img" src="../img/icons8-edit-64.png" alt="options" onClick={editHandler} />
      {modalWindow && (
        <ModalWindow
          title="Редактирование"
          onClose={() => {
            close();
          }}
        >
          {Object.entries(fields).map(([key, value]) => (
            <div key={key}>
              <span>{key}: </span>
              <input
                type="text"
                name={key}
                defaultValue={value}
                onChange={handleChange}
              />
            </div>
          ))}
          <button onClick={() => console.log(fields)}>Сохранить</button>
        </ModalWindow>
      )}
    </>
  );
}