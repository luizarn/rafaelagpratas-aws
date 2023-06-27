import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ListProductsByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const response = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${category}`);
    response
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <ProductsContainer>
      {!products || products.length === 0 ? (
        <div style={{ height: '350px' }}>
          <p>Por enquanto não há produtos nessa categoria, aguarde...</p>
        </div>
      ) : (
        products.map((p) => (
          <Link to={`/produtos/${encodeURIComponent(p.title)}`} key={p.id} style={{ textDecoration: 'none' }}>
            <ContainerStyle>
              <ImageInfo>
                <img src={p.publicUrl} alt="Logotipo" />
                {p.quantity < 1 && <SoldOutLabel>ESGOTADO</SoldOutLabel>}
                <ContainerInfos>
                  <h1>{p.title}</h1>
                  <h2>R$ {parseFloat(p.price).toFixed(2).replace('.', ',')}</h2>
                  <br></br>
                  <h1>
                    <span>3x</span> de <span>R$ {parseFloat(p.price / 3).toFixed(2).replace('.', ',')}</span> sem juros
                  </h1>
                </ContainerInfos>
              </ImageInfo>
            </ContainerStyle>
          </Link>
        ))
      )}
    </ProductsContainer>
  );
}

const ContainerStyle = styled.div`
  width: 200px;
  border-bottom: 3px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  @media screen and (max-width: 600px) {
    width: 130px;
}
`;

const ImageInfo = styled.div`
  position: relative;
  img {
    width: 250px;
    height: 350px;
    border-radius: 25px;
  }
  @media screen and (max-width: 600px) {
    img {
    width: 125px;
    height: 175px;
    border-radius: 25px;
  }
}
`;

const SoldOutLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px;
  background-color: black;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
`;

const ContainerInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #262626;
  margin: 10px 10px;
  font-family: 'Ubuntu Mono';
  margin-bottom: 20px;
  h2 {
    font-weight: 800;
    color: #6cbfa6;
    font-size: 25px;
  }
  h1 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 18px;
  }
  span {
    font-weight: 900;
  }
  @media screen and (max-width: 600px) {
    h2 {
    font-size:14px;
  }
  h1 {
    font-size:14px;
  }
}
`;

const ProductsContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  min-height: 450px;
  p {
    margin-top: 100px;
    font-size: 18px;
  }
`;
