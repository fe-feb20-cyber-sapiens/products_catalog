import { FC, useMemo, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Product } from '../../utils/typedefs';
import {
  itemsByDefault,
  itemsPerPageOptions,
  pageByDefault,
  sortOptions,
} from '../../utils/constants';

import './ProductsPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { usePagination } from '../../hooks/usePagination';
import { useProducts } from './useProducts';
import {
  BreadCrumbs,
  CustomDropdown,
  Pagination,
  ProductsCatalog,
} from '../../components';
import { SortType, getSortedBy } from '../../utils/helper';

interface Props {
  title: string,
  endpoint: string,
}

export const ProductsPage: FC<Props> = (props) => {
  const { title, endpoint } = props;
  const [sortBy, setSortBy] = useState<SortType>(SortType.Newest);

  const handleSortBy = (option: SortType) => {
    setSortBy(option);
  };

  const {
    products,
    isError,
    isLoading,
    isVisibleModal,
    isVisibleProducts,
  } = useProducts({ endpoint });

  const sortedProducts: Product[] = useMemo(() => (
    getSortedBy(products, sortBy)
  ), [products, sortBy]);

  const {
    currentPage,
    itemsPerPage,
    selectedItems,
    onPageChange,
    elements,
    handleItemsPerPageChange,
  } = usePagination<Product>({
    defaultCurrentPage: pageByDefault,
    defaultItemsPerPage: itemsByDefault,
    elements: sortedProducts,
  });

  return (
    <main className="productsPage">
      {isLoading && (
        <Spinner variant="dark" />
      )}

      {isVisibleProducts && (
        <>
          <div className="productPage__container">
            <div className="productsPage__top">
              <BreadCrumbs />

              <h1 className="productsPage__title">
                {title}
              </h1>

              <p>{`${products.length} models`}</p>
            </div>

            <div className="productsPage__dropdowns">
              <CustomDropdown
                title="Sort by"
                options={sortOptions}
                handleItemsPerPageChange={handleSortBy}
              />

              <CustomDropdown
                size="small"
                title="Items on page"
                options={itemsPerPageOptions}
                handleItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>

            <ProductsCatalog products={selectedItems} />
          </div>

          <Pagination
            total={elements.length}
            perPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}

      {isVisibleModal && (
        <div className="productsPage__modal">
          Oops... Unfortunately, these products are not available yet..
        </div>
      )}

      {isError && !isLoading && (
        <div className="productsPage__modal">
          Oops... Try again.
        </div>
      )}
    </main>
  );
};
