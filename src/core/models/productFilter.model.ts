
export enum FilterKeys {
    Name = 'name',
    Price = 'price',
    RecentlyAdded = 'creationDate' 
}

export interface SortOptionsModle {
    label: string, 
    value: string 
}

export const ProductSortOptions: SortOptionsModle[] = [
    { label: 'Name', value: FilterKeys.Name },
    { label: 'Price', value: FilterKeys.Price },
    { label: 'Recently Added', value: FilterKeys.RecentlyAdded },
  ];


  export interface FilterContextType {
    eventSort:string 
    setSort:(sort: string) => void; 
    searchQuery:string; 
    setQuery:(query: string) => void;
  };

  export const FilterContextDefaultValue: FilterContextType = {
    eventSort:ProductSortOptions[1].value,
    setSort:() => null,
    searchQuery:'', 
    setQuery:() => null
  };