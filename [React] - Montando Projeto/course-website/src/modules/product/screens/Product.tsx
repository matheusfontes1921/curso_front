import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useEffect, useMemo, useState } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ProductType } from "../../../shared/types/ProductType";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { ColumnsType } from "antd/es/table";
import Table from "../../../shared/table/Table";
import CategoryColumn from "../components/CategoryColumn";
import TooltipImage from "../components/TooltipImage";
import { convertNumberToMoney } from "../../../shared/functions/money";
import Screen from "../../../shared/screen/Screen";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../routes";
import { ListBreadcrumb } from "../../../shared/breadcrumb/Breadcrumb";
import { LimitedContainer } from "../../login/components/styles/limited.style";
import {
  DisplayFlex,
  DisplayFlexJustifyBetween,
} from "../../login/components/styles/display.style";
import { useAppSelector } from "../../../store/hooks";
import { setProductsAction } from "../../../store/reducers/productReducer";
import { useProductReducer } from "../../../store/reducers/productReducer/useProductReducer";
import { useProduct } from "../hooks/useProduct";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
const { Search } = Input;

const listBreadcrumb: ListBreadcrumb[] = [
  {
    name: "HOME",
  },
  {
    name: "PRODUTOS",
  },
];

const Product = () => {
  const {
    handleOnClickInsert,
    handelEditProduct,
    handelDeleteProduct,
    onSearch,
    setProductsFiltered,
    productsFiltered,
  } = useProduct();
  const columns: ColumnsType<ProductType> = useMemo(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (_, product) => <TooltipImage product={product} />,
      },
      {
        title: "Nome",
        dataIndex: "nome",
        key: "nome",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Categoria",
        dataIndex: "categoria",
        key: "categoria",
        render: (_, product) => <CategoryColumn category={product.category} />,
      },
      {
        title: "Preço",
        dataIndex: "preco",
        key: "preco",
        render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
      },
      {
        title: "Action",
        dataIndex: "",
        width: 240,
        key: "x",
        render: (_, product) => (
          <LimitedContainer width={180}>
            <DisplayFlex>
              <Button
                margin="0 16px"
                onClick={() => handelEditProduct(product.id)}
                icon={<EditOutlined />}
              >
                Editar
              </Button>
              <Button danger onClick={() => handelDeleteProduct(product.id)} icon={<DeleteOutlined />}>
                Deletar
              </Button>
            </DisplayFlex>
          </LimitedContainer>
        ),
      },
    ],
    [],
  );

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <DisplayFlexJustifyBetween margin={"0 0 16px 0"}>
        <LimitedContainer width={240}>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
};

export default Product;
