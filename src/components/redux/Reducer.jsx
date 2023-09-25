import {
  GET_ALL_FURNITURES,
  GET_FURNITURES_BY_NAME,
  FURNITURES_SORT_BY_NAME,
  FILTER_BY_PRICE,
  LOGIN_SUCCESS,
  PREV,
  NEXT,
} from "./actions/ActionsTypes";

const initialState = {
  allFurnitures: [],
  allCategory: [],
  furnituresByName: [],
  temporal: [],
  selectFurnitures: null,
  selectDbFurnitures: null,
  numPage: 1,
  minPrice: "",
  maxPrice: "",
  token: null,
};

export default function reducer(state = initialState, { type, payload }) {
  console.log("Reducer type:", type); // Agregado para depuración
  console.log("Reducer payload:", payload); // Agregado para depuración

  switch (type) {
    case GET_ALL_FURNITURES:
      return {
        ...state,
        allFurnitures: payload,
        temporal: payload,
      };
    case GET_FURNITURES_BY_NAME:
      return {
        ...state,
        furnituresByName: payload,
      };
    case FURNITURES_SORT_BY_NAME:
      const sortedFurnituresByName = [...state.allFurnitures];
      sortedFurnituresByName.sort((a, b) => {
        if (payload === "A") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return {
        ...state,
        allFurnitures: sortedFurnituresByName,
      };

    case FILTER_BY_PRICE: 
      const { minPrice, maxPrice } = payload;
      const filteredFurnituresByPrice = state.temporal.filter((furniture) => {
        const price = parseFloat(furniture.price);
        return (
          (isNaN(minPrice) || price >= minPrice) &&
          (isNaN(maxPrice) || price <= maxPrice)
        );
      });
      return {
        ...state,
        allFurnitures: filteredFurnituresByPrice,
        minPrice, // Actualiza el estado del precio mínimo
        maxPrice, // Actualiza el estado del precio máximo
      };

    case PREV:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case NEXT:
      return {
        ...state,
        numPage: state.numPage + 1,
      };

      case LOGIN_SUCCESS:
        return {
          ...state,
          token: payload,
        };

    default:
      return { ...state };
  }
}
