import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import CartContext from '../../contexts/Cartcontext';
import { useContext } from 'react';

export default function Cart() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [attProducts, setAttProducts] = useState(false);
  const { setCartCount } = useContext(CartContext);
  const [idCard, setIdCard] = useState(null)
  const token = useToken();
  const navigate = useNavigate()
  let grandTotal = 0;
  

  useEffect(() => {
    const response = axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/cart/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response
      .then((res) => {
        setProductsInCart(res.data);
        console.log(res.data)
        setCartCount(res.data.length);
        setAttProducts(false);
        setIdCard(res.data[0].cartId)
      })
      .catch((err) => console.log(err));
  }, [attProducts]);

  async function deleteProduct(id, productId, quantity ) {
    try {
      console.log(id);
      if (confirm('Confirma a remoção deste produto?')) {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/cart/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

         await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/products/updateByCart/${productId}`,
          {quantityChange: quantity},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttProducts(true);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  function calculateGrandTotal() {
    for (const product of productsInCart) {
      grandTotal += parseFloat(product.product.price) * product.quantity;
    }
    return grandTotal.toFixed(2);
  }

async function addToPurchase(){
try{
  const result = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/purchase`,
    {total: grandTotal, cartId: idCard},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    navigate(`/checkout/${result.data.id}`)
} catch (err) {
  alert(err.response.data.message);
}
 
}

  return (
    <ProductsContainer>
      {!productsInCart || productsInCart.length === 0 ? (
        <Container>
          <p>Carrinho de Compras</p> <br></br> <br></br>
          <h3>
            Seu carrinho está vazio. <br></br> <br></br>
            Para continuar comprando, navegue pelo menu do site, faça uma busca pelo seu produto ou clique no botão abaixo.
          </h3>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <StyledButton>Escolher Produtos</StyledButton>
          </Link>
        </Container>
      ) : (
        <>
          <p>Carrinho de Compras</p> <br></br>
          {productsInCart.map((p) => (
            <UnicItem key={p.id}>
              <div>
                <ImageInfo>
                  <Link to={`/produtos/${encodeURIComponent(p.product.title)}`} style={{ textDecoration: 'none' }}>
                    <img src={p.product.publicUrl} alt="Logotipo" />
                  </Link>
                  <ContainerInfos>
                    <Link to={`/produtos/${encodeURIComponent(p.product.title)}`} style={{ textDecoration: 'none' }}>
                      <h1><span>{p.product.title}</span></h1>
                    </Link>
                    <h2>R$ {parseFloat(p.product.price).toFixed(2).replace('.', ',')}</h2>
                    <br></br>
                    <h1>
                      <span>Quantidade:</span> {p.quantity}
                    </h1>
                    <br></br>
                    <span>Total:</span> <h4>R$ {parseFloat(p.product.price * p.quantity).toFixed(2).replace('.', ',')}</h4>
                  </ContainerInfos>
                </ImageInfo>
              </div>
              <div>
                <ion-icon onClick={() => deleteProduct(p.id, p.productId, p.quantity)} name="trash-outline"></ion-icon>
              </div>
            </UnicItem>
          ))}
                  <p>Total do carrinho: R$ {Number(calculateGrandTotal()).toFixed(2).replace('.', ',')}</p>
                  <ContainerButtons>
  <Link to='/' style={{ textDecoration: 'none' }}>
           <StyleButton style={{background:"#C0C0C0"}}>CONTINUAR COMPRANDO</StyleButton> 
           </Link>
            <StyleButton style={{background: "#00FF7F"}} onClick={() => addToPurchase()}>FINALIZAR COMPRA</StyleButton>
   </ContainerButtons>
        </>
      )}
    </ProductsContainer>
  );
}

const ImageInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 130px;
    height: 190px;
    border-radius: 25px;
    margin-right: 30px;
  }
`;

const ContainerInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: #262626;
  margin: 10px 10px;
  font-family: 'Ubuntu Mono';
  margin-bottom: 20px;
  h2 {
    font-size: 20px;
  }
  h1 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 18px;
    color: #262626;
  }
  span {
    font-weight: 900;
  }
  h4{
    font-weight: 800;
    color: #6cbfa6;
    font-size: 20px;
  }
  @media screen and (max-width: 600px) {
        h2 {
          font-size:16px;
        }
        h4 {
          font-size:16px;
        }
        h1{
          font-size:16px;
        }
    }
`;

const ProductsContainer = styled.div`
  width: 80%;
  margin:80px auto;
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-family: 'Ubuntu Mono';
    font-size: 34px;
    font-weight: 900;
  }
  h3 {
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
       p{
          font-size:20px;
        }
    }
`;

const StyledButton = styled.button`
  height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  background: rgba(108, 191, 166, 0.9);
  border: 1px solid #ace4d3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  color: #ffffff;
  margin-left: 20px;
  text-decoration: none;
  margin-top: 30px;
  @media screen and (max-width: 600px) {
        width: 80%;
        height: 40px;
    }
`;

const UnicItem = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 3px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content:space-around;
  ion-icon {
    width: 30px;
    height: 80px;
    border-radius: 25px;
  }
`;

const StyleButton = styled.button`
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
   @media screen and (max-width: 600px) {
        width: 200px;
        height: 29px;
        font-size: 12px;
    }
  `

const ContainerButtons = styled.div`
  margin-top: 20px;
  display:flex;
  align-items:center;
  justify-content:center;
  @media screen and (max-width: 600px) {
        flex-direction:column;
    }
`
const Container = styled.div`
   height: 350px;
   @media screen and (max-width: 600px) {
    width: 95%;
    margin: 0 auto;
        p{
          font-size: 16px;
        }
        h3{
          font-size: 16px;
        }
    }
`