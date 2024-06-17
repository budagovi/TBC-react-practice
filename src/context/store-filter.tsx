'use client'
import { ReactNode, useReducer, createContext } from "react"
export const StoreFilterContext = createContext<IStoreFilterContext>({} as IStoreFilterContext);

const initialValue: IStoreFilterState = {
  searchValue: '',
  priceRange: { max: 200, min: 0 },
  tags: [],
  sortBy: null
}


const storeReducer = (state: IStoreFilterState, action: IStoreFilterAction): IStoreFilterState => {

  const { type, payload } = action;

  switch (type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: payload
      }
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: {
          min: payload[0],
          max: payload[1]
        }
      }
    case 'SET_TAGS':
      return {
        ...state,
        tags: payload
      }
    case 'CLEAR_FILTER':
      return payload
    default:
      return initialValue;
  }
}

interface IProps {
  children: ReactNode
}

const StoreFilterContextProvider = ({ children }: IProps) => {

  const [state, dispatch] = useReducer(storeReducer, initialValue);

  // Actio handlers
  const searchValueHandler = (searchValue: string) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }
  const priceRangeHandler = (min: number, max: number) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: [min, max] })
  }
  const setTagsHandler = (tags: string[]) => {
    if (includesInvalidType(tags))
      return;

    const newTags = tags as IStoreTagsType;
    dispatch({ type: 'SET_TAGS', payload: newTags })
  }
  const sortHandler = () => {

  }
  const clearFilterHandler = () => {
    dispatch({ type: 'CLEAR_FILTER', payload: initialValue })
  }
  const value: IStoreFilterContext = {
    searchValue: state.searchValue,
    priceRange: state.priceRange,
    tags: state.tags,
    sortBy: state.sortBy,
    setSearch: searchValueHandler,
    setRange: priceRangeHandler,
    setTags: setTagsHandler,
    sort: sortHandler,
    clear: clearFilterHandler
  }

  return (
    <StoreFilterContext.Provider value={value}>
      {children}
    </StoreFilterContext.Provider>
  )
}

export default StoreFilterContextProvider;

// Types

/**
 * type of Store Filter's reducer state
 */
interface IStoreFilterState {
  searchValue: string,
  priceRange: { min: number, max: number },
  tags: IStoreTagsType,
  sortBy: 'price' | 'priceDesc' | 'size' | 'sizeDesc' | null
}

/**
 * type of Store Filter Context
 */
interface IStoreFilterContext extends IStoreFilterState {
  setSearch: (value: string) => void,
  setRange: (min: number, max: number) => void,
  setTags: (tag: string[]) => void,
  sort: (tag: string) => void,
  clear: () => void
}

/**
 * type of Store Filter's reducer action
 */
type IStoreFilterAction = {
  type: 'SET_SEARCH_VALUE',
  payload: string
} | {
  type: 'SET_PRICE_RANGE',
  payload: number[]
} | {
  type: 'SET_TAGS',
  payload: IStoreTagsType
} | {
  type: 'CLEAR_FILTER',
  payload: IStoreFilterState
}

/**
 * type of Store Filter's tag input
 */
type IStoreTagsType = Array<IStoreTag>
type IStoreTag = 'medium' | 'large' | 'small' | 'pet friendly' | 'slow' | 'fast' | 'non-flowering' | 'seasonal flowering'

const validTags: IStoreTag[] = ['medium', 'large', 'small', 'pet friendly', 'slow', 'fast', 'non-flowering', 'seasonal flowering'];

// check if a string is not a valid Tag
const includesInvalidType = (array: string[]): boolean => {
  return array.some(value => !validTags.includes(value as IStoreTag));
}