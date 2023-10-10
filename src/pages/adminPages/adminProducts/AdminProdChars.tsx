import React, { useEffect, useState } from "react";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import axios, { AxiosError } from "axios";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { Edit } from "../../../components/service/Edit";
import { Delete } from "../../../components/service/Delete";

type ProdCharProps = {
  prodChar: IProdChars;
};

type IProdChars = {
    _id?: string;
  } & {
    [key: string]: {
      title?: string;
      values?: string[];
    };
  };

export function AdminProdChars() {
  const [prodChars, setProdChars] = useState<IProdChars[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchProdChars() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IProdChars[]>(
        "http://localhost:5000/prodchars/"
      );
      setProdChars(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProdChars();
  }, []);

  return (
    <>
      <AdminBasePage>
        <div className="profile-container">
          {loading && <Loader />}
          <table className="admin-table">
            <tbody>
              <tr className="admin-table-row">
                <th className="admin-table-th">ID</th>
                <th className="admin-table-th">Название</th>
                <th className="admin-table-th">Значения</th>
                <th className="admin-table-th">Действия</th>
              </tr>
              {prodChars.map((prodChar, index) => (
                <AdminProdChar prodChar={prodChar} key={index} />
              ))}
            </tbody>
          </table>
          {error && <ErrorMessage error="Не удалось загрузить товары" />}
        </div>
      </AdminBasePage>
    </>
  );
}

function AdminProdChar({ prodChar }: ProdCharProps) {
    console.log(prodChar._id); // Отладочный вывод
    return (
      <tr className="admin-table-row">
        <td className="admin-table-col">{prodChar._id}</td>
        {Object.entries(prodChar).map(([key, value]) => {
          if (key !== "_id") {
            if (typeof value === "object" && value !== null && "title" in value) {
              return (
                <React.Fragment key={key}>
                  <td className="admin-table-col">{value.title}</td>
                  <td className="admin-table-col">
                    {value.values?.map((val, index) => (
                      <div key={index}>{val}</div>
                    ))}
                  </td>
                </React.Fragment>
              );
            }
          }
          return null;
        })}
        <td className="admin-table-col">
          <div className="admin-table-col-y">
            <Edit object={prodChar} headers={[]} />
            <Delete />
          </div>
        </td>
      </tr>
    );
  }