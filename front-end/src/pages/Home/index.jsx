import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const [productsEmphasis, setProductsEmphasis] = useState([]);
  const [productsLaunch, setProductsLaunch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/emphasis`);
        setProductsEmphasis(response.data);

        const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/launch`);
        setProductsLaunch(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsEmphasis = productsEmphasis.slice(indexOfFirstProduct, indexOfLastProduct);
  const currentProductsLaunch = productsLaunch.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = Math.ceil(productsEmphasis.length / productsPerPage);

  return (
    <Container>
      <p>Destaques</p>
      <ProductsContainer>
        {!currentProductsEmphasis || currentProductsEmphasis.length === 0 ? (
          <div style={{ height: '350px' }}>
            <p>Por enquanto não há produtos nessa categoria, aguarde...</p>
          </div>
        ) : (
          currentProductsEmphasis.map((p) => (
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

      <p>Lançamentos</p>
      <ProductsContainer>
        {!currentProductsLaunch || currentProductsLaunch.length === 0 ? (
          <div style={{ height: '350px' }}>
            <p>Por enquanto não há produtos nessa categoria, aguarde...</p>
          </div>
        ) : (
          currentProductsLaunch.map((p) => (
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

      {pageNumbers > 1 && (
        <PaginationContainer>
          {Array.from({ length: pageNumbers }, (_, index) => (
            <PaginationDot
              key={index}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            />
          ))}
        </PaginationContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 30px auto;
  p {
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
    margin-bottom: 50px;
  }
`;

const ContainerStyle = styled.div`
  border-bottom: 3px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  margin-top: 0;
  .product-image {
    position: relative;
    width: fit-content;
    height: fit-content;
    border-radius: 25px;
    width: 250px;
    height: 350px;
    overflow: hidden;
  }

  .product-image img {
    display: block;
    width: 100%;
    height: auto;
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
    width: 130px;
}
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PaginationDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#6ad0af' : '#dbdbdb')};
  margin: 0 5px;
  cursor: pointer;
`;

