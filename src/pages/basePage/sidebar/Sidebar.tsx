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
      <li className="sidebar-nav" key={category._id}>
        <Link to={""} className="sidebar-nav-item" onClick={() => handleCategoryClick(category.title)}>
          {category.title}
        </Link>
        {hasChildren && isExpanded && (
          <ul>
            {category.children && category.children.map((child, index) => (
              <li className="sidebar-nav" key={index}>
                <Link className="sidebar-nav-item" to={""} onClick={() => handleCategoryClick(child)}>
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
        return null;
      }
      return renderCategory(category);
    });
  };

  return (
    <div className="sidebar">
      <ul>
        <div>
          <li className="sidebar-nav">
            <Link to={""} className="sidebar-nav-item" onClick={() => handleCategoryClick("")}>
              Все товары
            </Link>
          </li>
        </div>
        {renderCategories(categories)}
      </ul>
    </div>
  );
}