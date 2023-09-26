import React, { useState } from "react";
import "./Sidebar.css";
import { ICategory } from "../../../models";
import { Link } from "react-router-dom";

interface SidebarProps {
  children: ICategory[];
  onCategorySelect: (category: string) => void;
  categories: ICategory[];
}

export function Sidebar({ children, onCategorySelect, categories }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
    onCategorySelect(category);
  };

  const renderCategory = (category: ICategory) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.includes(category.title);

    

    return (
      <li key={category._id}>
        <Link to={""} onClick={() => handleCategoryClick(category.title)}>
          {category.title}
        </Link>
        {hasChildren && isExpanded && (
          <ul>
            {category.children && category.children.map((child, index) => (
              <li key={index}>
                <Link to={""} onClick={() => handleCategoryClick(child)}>
                  {child}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const renderCategories = (categories: ICategory[]) => {
    return categories.map((category: ICategory) => {
      if (category.parent) {
        // Если у категории есть родитель, пропускаем ее при рендере категорий первого уровня
        return null;
      }
      return renderCategory(category);
    });
  };

  return (
    <div className="sidebar">
      <ul>
        <div className="sidebar-nav">
          <li>
            <Link to={""} onClick={() => handleCategoryClick("")}>
              Все товары
            </Link>
          </li>
        </div>
        {renderCategories(categories)}
      </ul>
    </div>
  );
}