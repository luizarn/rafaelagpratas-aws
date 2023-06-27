import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from "../../assets/images/white_logo.png"
import useToken from '../../hooks/useToken';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import useNameUser from '../../hooks/useNameUser';

export default function Checkout() {
  const [purchase, setPurchase] = useState({});
  const [quantityItems, setQuantityItems] = useState(0)
  const [total, setTotal] = useState(0)
  const { id } = useParams();
  const token = useToken();
  const userName = useNameUser();
  const { userData } = useContext(UserContext);
  const { surname } = userData.user;
  const { cpf } = userData.user;
  const { email } = userData.user;
  const { phone } = userData.user;
  

  useEffect(() => {
    const response = axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/purchase/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response
      .then((res) => {
        setPurchase(res.data);
        console.log(res.data)
        setTotal(res.data.total)
        console.log((Object.keys(res.data.cart.items).length))
        setQuantityItems(Object.keys(res.data.cart.items).length)
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <Container>
        <ContainerUser>
        <img src={logo} alt="Logotipo" />
        <p>Informações</p> 
        <InfosUser>
        <h4><span>{(userName).toUpperCase()} {(surname).toUpperCase()}</span> ({(cpf).replace(
  /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
  '$1.$2.$3-$4'
)})</h4>
        <h4>{email}</h4>
        <h4>{phone}</h4>
        </InfosUser>
       <p> Entrega</p> 
<StyleButtonAdress>Adicionar Novo Endereço</StyleButtonAdress>
<StyledButton>Salvar e ir para pagamento</StyledButton>
<StyledLink to="/">
     Quer adicionar mais itens ao carrinho? <span> Retorne a página de produtos clicando aqui</span>
      </StyledLink>
        </ContainerUser>
      <ContainerInfos>
        <Information>
      <p>Resumo da compra</p> 
      {quantityItems === 1 ? (
        <Link to='/carrinho'>
         <h3> {quantityItems} item</h3> </Link>
      ): (
        <Link to='/carrinho'>
        <h3> {quantityItems} itens</h3> </Link>
      )}
      </Information>
      {purchase.cart && purchase.cart.items && purchase.cart.items.map((item) => (
            <ImageInfo key={item.id}>
              <img src={item.product.publicUrl} alt="Logotipo" />
                <h1>{item.product.title}</h1>
                <div>
                <h4>R$ {parseFloat(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</h4>
                {item.quantity > 1 ? ( <StyleButton>
                   {item.quantity} itens
                </StyleButton>) : ("")}
                </div>
            </ImageInfo>
      ))}
      <div style={{borderTop: '1px solid #dbdbdb'}}>
        <Information>
      <h3>Subtotal:</h3> <h3> R$ {parseFloat(total).toFixed(2).replace('.', ',')} </h3>
      </Information>
      <Information>
      <h3>Frete: </h3> <h3>A calcular</h3>
      </Information>
      <Information>
      <h3>Total: </h3> <h3>R$ {parseFloat(total).toFixed(2).replace('.', ',')}</h3>
      </Information>
      </div>
      </ContainerInfos>
    </Container>
  );
      }
const ImageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin-top:15px;
  margin-bottom: 20px;
  font-size:18px;
  color:#333333;
  img {
    width: 90px;
    height: 110px;
    border-radius: 10px;
  }
  h1{
    margin-left:0;
  }
`
const ContainerInfos = styled.div`
  width:30%;
  @media screen and (max-width: 600px) {
    width: 100%;
}
`;

const Container = styled.div`
  width: 80%;
  margin:80px auto;
  min-height: 450px;
  display: flex;
  p {
    font-family: 'Ubuntu Mono';
    font-size: 28px;
    font-weight: 900;
  }
  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
    color: black;
  }
  @media screen and (max-width: 600px) {
    flex-direction:column;
}
`;

const StyleButton = styled.div`
width:60px;
height: 25px;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #dbdbdb;
border-radius: 5px;
font-size: 12px;
margin-top: 5px;
  `

const Information = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const ContainerUser = styled.div`
width:60%;
padding-right:70px;
img{
    width: 220px;
    height: 60px;
    margin-bottom: 60px;
}
h4{
    font-size:18px;
  color:#333333;
  font-weight: 500;
  margin-bottom:15px;
}
span{
font-weight:700;
@media screen and (max-width: 600px) {
    width: 100%;
    padding-right:1px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
}
`;

const StyleButtonAdress = styled.div`
height: 60px;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #dbdbdb;
border-radius: 5px;
font-size: 18px;
margin-top: 35px;
margin-bottom: 20px;
@media screen and (max-width: 600px) {
 font-size: 14px;
}
  `
const StyledButton = styled.button`
background-color: #00FF7F;
width:300px;
  height: 50px;
  display: flex;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color:#ffffff;
  `

const StyledLink = styled(Link)`
margin-top: 20px;
  text-decoration: none;
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  span{
    font-weight: 700;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    span{
      margin-top:15px;
      margin-bottom: 15px;
    }
}
`

const InfosUser = styled.div`
margin-top: 35px;
border-bottom: 0.5px solid #dbdbdb;
margin-bottom: 35px;
 @media screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}

`