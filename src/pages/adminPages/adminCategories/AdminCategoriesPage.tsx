import React, { useContext, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ICategory } from "../../../models";
import { Loader } from "../../../components/service/Loader";
import { ErrorMessage } from "../../../components/service/ErrorMessage";
import { AdminCategory } from "./AdminCategory";
import { AdminBasePage } from "../adminBasePage/AdminBasePage";
import { ModalWindow } from "../../../components/service/ModalWindow";
import { ModalWindowContext, ModalWindowState } from "../../../context/ModalWindowContext";
import { CreateCategory } from "../../catalogPages/products/CreateCategory";

export function AdminCategoriesPage() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { modalWindow, open, close } = useContext(ModalWindowContext);
    const scrollToTopRef = useRef<HTMLDivElement>(null);
  
    function addCategory(category: ICategory) {
      setCategories((prev) => [...prev, category]);
    }
  
    async function fetchCats() {
      try {
        setError("");
        setLoading(true);
        const response = await axios.get<ICategory[]>(
          "http://localhost:5000/categories"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setError(error.message);
      }
    }
  
    useEffect(() => {
      fetchCats();
    }, []);
  
    const createHandler = async (category: ICategory) => {
      close();
      addCategory(category);
      await addCategory(category);
      await fetchCats();
    };
  
    return (
      <>
        <AdminBasePage>
          <div className="admin-cat-container">
            <div ref={scrollToTopRef}></div>
            {loading && <Loader />}
            <table className="admin-table">
              <tbody>
                <tr className="admin-table-row">
                  <th className="admin-table-th">ID категории</th>
                  <th className="admin-table-th">Название категории товара</th>
                  <th className="admin-table-th">Родительская категория</th>
                  <th className="admin-table-th">
                    Количество наименований в категории
                  </th>
                  <th className="admin-table-th">Действия</th>
                </tr>
                {categories.map((category) => (
                  <AdminCategory cat={category} key={category._id} />
                ))}
              </tbody>
            </table>
            <ModalWindowState>
            <button
              className="addProduct-btn"
              onClick={() => {
                scrollToTopRef.current?.scrollIntoView({ behavior: "smooth" });
                open();
              }}
            ></button>
            
            {modalWindow && (
              <ModalWindow
                title="Создать категорию"
                onClose={() => {
                  close();
                }}
              >
                <CreateCategory onCreate={createHandler}></CreateCategory>
              </ModalWindow>
            )}
            </ModalWindowState>
            {error && <ErrorMessage error="Не удалось загрузить товары" />}
          </div>
        </AdminBasePage>
      </>
    );
  }