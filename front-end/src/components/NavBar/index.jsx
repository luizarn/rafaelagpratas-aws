import styled from 'styled-components';
import logo from "../../assets/images/white_logo.png"
import { Link } from "react-router-dom"
import useNameUser from '../../hooks/useNameUser';
import CartContext from '../../contexts/Cartcontext';
import { useContext } from 'react';

export default function NavBar() {
    const userName = useNameUser();
    const { cartCount } = useContext(CartContext);

    return (
          <StyleNavBar>
            <img src={logo} alt="Logotipo" />
            <input type="text" placeholder="Olá, o que você está buscando?" />
            <ContainerNameandIcons>
              <ContainerIcons>
                <ion-icon name="chatbubbles-outline"></ion-icon>
                <Link to="/sign-in">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </Link>
                <Link to='/carrinho'>
                <CartIconWrapper>
                  <ion-icon name="bag-handle-outline"></ion-icon>
                   {cartCount > 0 ? <CartItemCount>{cartCount}</CartItemCount> : null}
                </CartIconWrapper>
                </Link>
              </ContainerIcons>
              {userName ? <p>Olá, {userName}! </p> : ""}
            </ContainerNameandIcons>
          </StyleNavBar>
      );
    }

const StyleNavBar = styled.div`
width: 100%;
height: 100px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
display: flex;
justify-content:space-around;
align-items: center;
input{
    box-sizing: border-box;
    width: 280px;
    height: 20px;
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
img{
    width: 160px;
    height: 40px;
}
@media (max-width: 600px) {
        height: 200px;
        flex-direction: column;
        justify-content: center;

        input {
            margin-top: 20px;
        }

        img {
            width: 120px;
            height: 40px;
        }
    }
`
const ContainerIcons = styled.div`
    display: flex;
    ion-icon{
        width: 35px;
        height: 34px;
        margin-right: 30px;
        color: #6CBFA6;
    }
    @media screen and (max-width: 600px) {
        ion-icon{
          width: 30px;
        height: 29px;
        }
    }
`
const ContainerNameandIcons = styled.div`

display:flex;
flex-direction:column;
align-items: center;
    text-align: center;
    p{
        margin-top: 10px;
        font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #6CBFA6;
    }
`

const CartIconWrapper = styled.div`
  position: relative;
`;

const CartItemCount = styled.span`
  position: absolute;
  top: -9px;
  right: 0px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 12px;
  font-weight: bold;
`
