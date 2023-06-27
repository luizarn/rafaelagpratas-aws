import styled from "styled-components"
import useNameUser from '../../hooks/useNameUser';
import { Link } from "react-router-dom";
import logo from "../../assets/images/white_logo.png"
import ListProductsEdition from "../../components/ProductAdmin";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CreateProduct from "../../components/CreateProduct";
import EditProduct from "../../components/EditProduct";
import useToken from "../../hooks/useToken";

export default function Admin() {
  const [products, setProducts] = useState(null);
  const [addSelected, setAddSelected] = useState(false);
  const [editSelected, setEditSelected] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState(null);
  const [attProducts, setAttProducts] = useState(false);
  const token = useToken();

const userName = useNameUser();
console.log(selectedProductTitle)

useEffect(() => {
  const response = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/admin/list`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  response.then((res) => {
    console.log(res.data)
    setProducts(res.data);
    setAttProducts(false)
  });
  response.catch((err) => console.log(err));
}, [attProducts]);


 return (
<>
      <GoToPageAdminLink to="/">Ir para a página inicial do site</GoToPageAdminLink>
      <StyleNavBar>
        <img src={logo} alt="Logotipo" />
      </StyleNavBar>
      {addSelected ? (
        <CreateProduct setAddSelected={setAddSelected}
        setAttProducts={setAttProducts} />
      ) : editSelected ? (
        <EditProduct 
        setEditSelected={setEditSelected}
        selectedProductId={selectedProductId}
        selectedProductTitle={selectedProductTitle}
        setAttProducts={setAttProducts}
        />
      ) : (
        <Container>
          <p>
            OLá, {userName}! você está na página de edição e visualização dos seus produtos :)
          </p>
          <ContainerProducts>
            <TitleandAdd>
              <h2>PRODUTOS</h2>
              <div>
                <h3>Adicionar produto</h3>
                <ion-icon
                  onClick={() => setAddSelected(true)}
                  name="add-circle-outline"
                ></ion-icon>
              </div>
            </TitleandAdd>
            <input type="text" placeholder="Buscar produtos por nome" />
            {!products || products.length === 0 ? (
              <div style={{ height: "350px" }}>
                <p>
                  Não há produtos, adicione um produto clicando no ícone de
                  adicionar acima!
                </p>
              </div>
            ) : (
              products.map((p) => (
                <ListProductsEdition
                  key={p.id}
                  setAttProducts={setAttProducts}
                  setEditSelected={setEditSelected}
                  setSelectedProductId={setSelectedProductId}
                  setSelectedProductTitle={setSelectedProductTitle}
                  productId={p.id}
                  image={p.publicUrl}
                  title={p.title}
                  description={p.description}
                  price={p.price}
                  storage={p.quantity}
                  category={p.Category.title}
                  tag={p.Tag.title}
                  emphasis={p.emphasis}
                  launch={p.launch}
                />
              ))
            )}
          </ContainerProducts>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 10px;
  p{
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  h2{
    margin-top: 30px;
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  @media screen and (max-width: 600px) {
    p{
      font-size:10px;
    }
}
`

const GoToPageAdminLink = styled(Link)`
background-color: #6CBFA6;
height:30px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 14px;
display: flex;
align-items: center;
text-align: center;
color: #262626;
text-decoration: none;
padding-left: 10px;
`
const StyleNavBar = styled.div`
width: 100%;
height: 100px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
display: flex;
justify-content:space-around;
align-items: center;
img{
    width: 160px;
    height: 40px;
}
`
const ContainerProducts = styled.div`
width: 80%;
margin: 0 auto;
input{
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    background: #FAFAFA;
    border: 1px solid #ACE4D3;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #979797;
}
`

const TitleandAdd = styled.div`
  display:flex;
  justify-content: space-between;

  h3{
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  ion-icon{
        width: 35px;
        height: 34px;
        margin-right: 30px;
        color: #6CBFA6;
        margin-left: 5px;
    }
    div{
      display:flex;
  align-items: center;
  text-align: center;
    }
`
