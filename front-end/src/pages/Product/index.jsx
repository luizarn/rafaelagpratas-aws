import  { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'animate.css/animate.min.css'; 
import useToken from '../../hooks/useToken';
import { useContext } from 'react';
import CartContext from '../../contexts/Cartcontext';

export default function ListProduct() {
  const { titleProduct } = useParams();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [clickToBuy, setClickTobuy] = useState(false)
  const navigate = useNavigate();
  const token = useToken();
  const { setCartCount, cartCount } = useContext(CartContext);

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleIncrement = () => {
    if (product?.quantity < 1) return;
    if (product?.quantity <= amount) return alert('Não é possível adicionar maior quantidade do produto por conta do estoque');
    setAmount(amount + 1);
  };

  useEffect(() => {
    const decodedTitle = decodeURIComponent(titleProduct);
    const response = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/category/${encodeURIComponent(decodedTitle)}`);
    response
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function addTocart(){
    if(!token){
      navigate('/sign-in')
    }
    setClickTobuy(true)
    const body = {productId: product.id, quantity: amount}
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      const result = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/products/updateByCart/${product.id}`,
        {quantityChange: -amount},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       setCartCount (cartCount + 1)
      console.log(response);
      console.log(response.data);
      console.log(result.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }


  return (
    <ProductsContainer>
      <ContainerStyle isSoldOut={product?.quantity === 0}>
        <div className="product-image">
          <img src={product?.publicUrl} alt="Logotipo" />
          <div className="sold-out-label">ESGOTADO</div>
        </div>
        <ContainerInfos>
          <h3>{product?.title}</h3>
          <h2>R$ {parseFloat(product?.price).toFixed(2).replace('.', ',')}</h2>
          <br />
          <h1>
            <ion-icon name="card-outline"></ion-icon>
            <span>3x</span> de{' '}
            <span>R$ {parseFloat(product?.price / 3).toFixed(2).replace('.', ',')}</span> sem juros
          </h1>
          <ContainerButtonsFirst>
          <ContainerButtonsSecond>
            <AddButton disabled={product?.quantity < 1}>
              <h4 onClick={handleDecrement}>-</h4>
              {amount}
              <h4 onClick={handleIncrement}>+</h4>
            </AddButton>
            <StyledButton onClick={addTocart} disabled={product?.quantity < 1}>
              COMPRAR
            </StyledButton>
          </ContainerButtonsSecond>
          {clickToBuy ? (
            <Link to='/carrinho' style={{ textDecoration: 'none' }}>
             <StyledButtonCart className="animate__pulse">
             Ir até o carrinho
           </StyledButtonCart>
           </Link>
          ) : ( "")}
          </ContainerButtonsFirst>
          <div>
            <ion-icon name="bus-outline"></ion-icon> Meios de envio
          </div>

          <StyledInput name="password" placeholder="Seu CEP" type="password" required />
          <StyleButtonCep>CALCULAR</StyleButtonCep>
        </ContainerInfos>
      </ContainerStyle>
      <DescriptionText>
        <h4>
          <span>TODAS</span> nossas joias são fabricadas em <span>PRATA 925</span> e possuem garantia.
        </h4>
        {product.description}
      </DescriptionText>
    </ProductsContainer>
  );
}

const ContainerStyle = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 50px;
  margin-bottom: 10px;

  .product-image {
    position: relative;
    width: fit-content;
    height: fit-content;
    border-radius: 25px;
    width: 473px;
    height: 600px;
  }

  .product-image img {
    display: block;
    width: 100%;
    height: 600px;
  }

  .sold-out-label {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px;
    background-color: black;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    border-radius: 5px;
    opacity: ${(props) => (props.isSoldOut ? 1 : 0)};
    visibility: ${(props) => (props.isSoldOut ? 'visible' : 'hidden')};
    transition: opacity 0.3s, visibility 0.3s;
  }

  @media screen and (max-width: 600px) {
    flex-direction:column;
    .product-image {
      width: 130px;
      height: 175px;
    }

    .product-image img {
      width: 250px;
      height: 295px;
      border-radius: 25px;
    }
  }

`;


const ContainerInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  font-family: 'Ubuntu Mono';
  margin-bottom: 20px;

  h2 {
    font-weight: 800;
    color: #6cbfa6;
    font-size: 40px;
    margin-top: 25px;
  }

  h1 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 15px;
    line-height: 18px;
    color: #8f34eb;
    text-align: center;
  }

  h3 {
    font-weight: 900;
    font-size: 40px;
    margin-bottom: 10px;
    line-height: 18px;
  }

  span {
    font-weight: 900;
  }

  ion-icon {
    width: 30px;
    height: 27px;
  }
  @media screen and (max-width: 600px) {
    margin-top: 120px;
    h2 {
    font-size:14px;
    margin-top: 5px;
  }
  h1 {
    font-size:14px;
    margin-top: 5px;
    margin-bottom:0;
  }
    h3 {
    font-size:14px;
    margin-top: 15px;
  }
}
`;

const ProductsContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
  width: 80%;
  margin: 0 auto;
  min-height: 450px;
  border-bottom: 3px solid #dbdbdb;
  margin-bottom: 80px;
  p {
    margin-top: 100px;
    font-size: 18px;
  }
  span {
    font-weight: 900;
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
  @media screen and (max-width: 600px) {
    width:120px;
    font-size:12px;
}
`;

const AddButton = styled.button`
  height: 50px;
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  border-radius: 8px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 0.6em 1.2em;
  font-size: 18px;
  font-weight: 500;
  color: black;
  cursor: pointer;
  margin-left: 20px;

  :hover {
    border-color: #6cbfa6;
  }

  h4 {
    font-weight: 900;
    font-size: 28px;
    text-align:center;
  }
  @media screen and (max-width: 600px) {
    width: 100px;
    height:40px;
    h4 {
    font-size:14px;
    padding:0;
    justify-content:space-around;
  }
} 
`;

const ContainerButtonsSecond = styled.div`
  display: flex;
  align-items: center;
`;
const ContainerButtonsFirst = styled.div`
margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  @media screen and (max-width: 600px) {
  margin-top:10px;
}
`;

const StyledInput = styled.input`
  width: 50%;
  height: 30px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-size: 16px;
  line-height: 25px;
  background-color: #ffffff;
  color: #666666;
  margin-bottom:0;
`;

const StyleButtonCep = styled.button`
  width: 30%;
  height: 50px;
  display: flex;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #ace4d3;
  color: rgba(108, 191, 166, 0.9);
  @media screen and (max-width: 600px) {
   width: 60%;
}
`;

const DescriptionText = styled.div`
width:90%;
margin: 0 auto;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
  margin-top: 10px;
  @media screen and (max-width: 600px) {
   font-size: 12px;
}
`

const StyledButtonCart = styled.button`
margin-top: 40px;
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
  background: #ffffff;
  border: 1px solid #8f34eb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #8f34eb;
  margin-left: 20px;
  &.animate__pulse {
    animation: animate__pulse 10s;
  }
  @media screen and (max-width: 600px) {
   width: 100%;
}
`;
