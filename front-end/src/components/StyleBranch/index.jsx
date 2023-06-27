import styled from 'styled-components';
import logo from "../../assets/images/background.jpeg"

export default function StyleBranch() {
  return (
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
  )
}

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
span{
    width: 80%;
    margin: 0 auto;
    display:flex;
    justify-content: space-between;
}
 ion-icon{
   color: #FFFFFF;
   width: 25px;
    height: 18px;
 }
 h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    color: #262626;
 }
 h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    color: #979797;
 }
`