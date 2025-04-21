import { routes } from 'app/config/routes';
import PageHeader from '../page-header';
import { Link } from '@remix-run/react';
import ProductsTable from './product-list/table';
import { PageInfo, ProductsQueryResponse } from 'app/types/product/ProductNode';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.products.products,
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

export default function Products({
  responseData,
  first
}: {
  responseData: any,
  first: number
  
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 lg:mt-0">
          <Link
            to={routes.products.products}
            className="w-full lg:w-auto"
          >
          </Link>
        </div>
      </PageHeader>

      <ProductsTable responseData={responseData} pageSize={first}  />
    </>
  )
}


