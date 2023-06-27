import styled from 'styled-components';
import { useState } from 'react';
import logo from "../../assets/images/background.jpeg"
import { useEffect } from 'react';
import axios from 'axios';
import useIsOwnerUser from '../../hooks/useIsOwnerUser';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [showOptions, setShowOptions] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hovered, setHovered] = useState(false);
  const [options, setOptions] = useState({});
  const isOwner = useIsOwnerUser();

  const handleMouseEnter = () => {
    setHovered(true);
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleOptionsMouseLeave = () => {
    setShowOptions(false);
  };


useEffect(() => {
  const response = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/categories`);
  response.then((res) => {
    setOptions(res.data);
    console.log(res.data)
    console.log(options)
  });
  response.catch((err) => console.log(err));
}, []);

  return (
    <>
    {isOwner === false ? "" : (
    <GoToPageAdminLink to="/admin">
      Ir para a página de adminstrador
     </GoToPageAdminLink>)}
    <Container>
      <StyleDashboard>
        <span>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <h1>Início</h1>
          </Link>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h1>Produtos</h1>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
          <h1>Contato</h1>
        </span>
        {showOptions && (
          <OptionsOverlay
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleOptionsMouseLeave}
          >
            {options.map((o) => (
              <Link to={`/${o.title}`} key={o.title} style={{ textDecoration: 'none' }}>
            <OptionsText> {o.title}</OptionsText>
            </Link>
            ))}
          </OptionsOverlay>
        )}
      </StyleDashboard>
      <StyleContainer>
        <span>
          <div>
            <h1>Parcelamento </h1>
            <h2>em até 3x sem juros</h2>
            <ion-icon name="card"></ion-icon>
          </div>
          <div>
            <h1>Opções de retirada</h1>
            <h2>em Brasília</h2>
            <ion-icon name="home"></ion-icon>
          </div>
          <div>
            <h1>Jóias em PRATA</h1>
            <h2>925</h2>
            <ion-icon name="diamond"></ion-icon>
          </div>
        </span>
      </StyleContainer>
    </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleDashboard = styled.div`
  width: 100%;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #ACE4D3;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
  }

  div {
    display: flex;
    align-items: center;
  }

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #262626;
  }

  ion-icon {
    width: 15px;
    height: 13px;
    color: #6CBFA6;
  }
`;

const OptionsOverlay = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  height: 71px;
  background-color: #ACE4D3;
  border: 1px solid #ACE4D3;
  border-radius: 3px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    width: auto;
    flex-wrap: wrap;
}
`;


const StyleContainer = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  background-image: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  box-sizing: border-box;
  height: 71px;
  border: 1px solid #ACE4D3;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 3px;

  span {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  ion-icon {
    color: #FFFFFF;
    width: 25px;
    height: 18px;
  }

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    color: #262626;
  }

  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    color: #979797;
  }
`;

const OptionsText = styled.p`
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  color: #ffffff;
  margin: 14px;
  @media screen and (max-width: 600px) {
   font-size:11px;
}
`;

const GoToPageAdminLink = styled(Link)`
  background-color: #6cbfa6;
  height: 30px;
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
`;