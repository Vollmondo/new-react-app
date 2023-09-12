import React, { useContext, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { IProduct } from "../../../models";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { AdminProduct } from "./AdminProduct";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import { ModalWindowContext } from "../../../context/ModalWindowContext";
import { ModalWindow } from "../../../components/service/ModalWindow";
import { CreateProduct } from "../../../components/products/CreateProduct";


export function AdminProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { modalWindow, open, close } = useContext(ModalWindowContext);
    const scrollToTopRef = useRef<HTMLDivElement>(null);
  
    function addProduct(product: IProduct) {
      setProducts((prev) => [...prev, product]);
    }
  
    async function fetchProducts() {
      try {
        setError("");
        setLoading(true);
        const response = await axios.get<IProduct[]>(
          "http://localhost:5000/products/"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setError(error.message);
      }
    }
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const createHandler = async (product: IProduct) => {
      close();
      addProduct(product);
      await addProduct(product);
      await fetchProducts();
    };
  
    return (
      <>
        <AdminBasePage>
          <div className="admin-products-container">
            <div ref={scrollToTopRef}></div>
            {loading && <Loader />}
            <div className="admin-products-options">
              <div className="admin-products-options-category">
                <p className="admin-products-options-label">Категория:</p>
                <select name="category" id="">
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
            </div>
            <table className="admin-table">
              <tbody>
                <tr className="admin-table-row">
                  <th className="admin-table-th">ID товара</th>
                  <th className="admin-table-th">Категория товара</th>
                  <th className="admin-table-th">Название товара</th>
                  <th className="admin-table-th">Описание товара</th>
                  <th className="admin-table-th">Рейтинг товара</th>
                  <th className="admin-table-th">Количество отзывов</th>
                  <th className="admin-table-th">Цена товара</th>
                  <th className="admin-table-th">
                    <img src="../img/icons8-create-64-w.png" alt="options" />
                  </th>
                </tr>
                {products.map((product) => (
                  <AdminProduct product={product} key={product._id} />
                ))}
              </tbody>
            </table>
            <button
              className="addProduct-btn"
              onClick={() => {
                scrollToTopRef.current?.scrollIntoView({ behavior: "smooth" });
                open();
              }}
            ></button>
            {modalWindow && (
              <ModalWindow
                title="Создать новый продукт"
                onClose={() => {
                  close();
                }}
              >
                <CreateProduct onCreate={createHandler}></CreateProduct>
              </ModalWindow>
            )}
            {error && <ErrorMessage error="Не удалось загрузить товары" />}
          </div>
        </AdminBasePage>
      </>
    );
  }