import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ProductRoutesEnum} from "../../product/routes";
import {useGlobalContext} from "../../../shared/hooks/useGlobalContext";
import {useGlobalReducer} from "../../../store/reducers/globalReducer/useGlobalReducer";

const FirstScreen = () => {
  const { user } = useGlobalReducer()
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(ProductRoutesEnum.PRODUCT)
    }
  }, [user]);
  return <Spin />;
};

export default FirstScreen;
