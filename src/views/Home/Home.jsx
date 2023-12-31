import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import CardContainer from '../../components/CardContainer/CardContainer';
import { getAllFurnitures } from '../../components/redux/actions/Actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import OrderByName from '../../components/OrderByName/OrderByName';
import FilterPrice from '../../components/FilterPrice/FilterPrice';
import { categoryFilter } from '../../helpers/categoryFilter';
import FilterCategory from '../../components/FilterCategory/FilterCategory';
import loading from '../../assets/loading.gif';

function Home() {
  const dispatch = useDispatch();
  const allFurnitures = useSelector((state) => state.allFurnitures);

  useEffect(() => {
    // Llamo a la acción que obtiene todas las furnitures
    dispatch(getAllFurnitures());
  }, [dispatch]);

  const [searchFurniture, setSearchFurniture] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('all'); // Estado para rastrear la categoría filtrada

  const handleSearch = (furniture) => {
    setSearchFurniture(furniture.toLowerCase());
  };

  // Filtrar los muebles que coincidan con la búsqueda
  const filteredFurnitures = allFurnitures.filter((furniture) =>
    furniture.name.toLowerCase().includes(searchFurniture)
  );

  // Función para manejar el filtro de categoría
  const handleCategoryFilter = (selectedCategory) => {
    console.log('selectedCategory:', selectedCategory);
    setFilteredCategory(selectedCategory);
  };

  // Aplicar el filtro de categoría
  const filteredFurnituresByCategory = filteredCategory === 'all'
    ? filteredFurnitures
    : filteredFurnitures.filter((furniture) => {
        return furniture.Categories.some((category) => category.name === filteredCategory);
      });

  console.log('filteredCategory:', filteredCategory);
  console.log('filteredFurnituresByCategory:', filteredFurnituresByCategory);

  return (
    <div>
      <div className={style.filtersContainer}>
        <div className={style.divSelect}>
          <OrderByName />
          <FilterCategory
            allCategories={categoryFilter}
            onFilterChange={handleCategoryFilter}
          />
          <FilterPrice />
        </div>
      </div>
      <SearchBar setSearch={handleSearch} />
      {allFurnitures.length === 0 ? (
        <img className={style.loading} src={loading} alt="Loading..." />
      ) : (
        <>
          {filteredFurnituresByCategory.length === 0 ? (
            <p className={style.errorText}>❌ Furniture Not Found! ❌</p>
          ) : (
            <CardContainer
              allFurnitures={
                filteredCategory === 'all'
                  ? filteredFurnitures
                  : filteredFurnituresByCategory
              }
            />
          )}
        </>
      )}
    </div>
  );

}

export default Home;

