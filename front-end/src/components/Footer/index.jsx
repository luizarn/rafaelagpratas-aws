import styled from 'styled-components';

export default function Footer() {
    return (
        <StyleFooter>
            <ContainerInfos>
            <InfoFooter>
                <p>Entre em contato</p>
                <ion-icon name="logo-whatsapp"></ion-icon>
            </InfoFooter>

            <InfoFooter>
                <p>Permaneça conectado</p>
            <ion-icon name="logo-instagram"></ion-icon>
            </InfoFooter>
            </ContainerInfos>
            <FinalText>
            <h1>Copyright RAFAELA GODOY PRATAS - 40877796000180 - 2023. Todos os direitos reservados.</h1>
            </FinalText>
        </StyleFooter>
    )
}

const StyleFooter = styled.div`
display: flex;
flex-direction: column;
justify-content:space-between;
width: 100%;
height: 158px;
background: rgba(108, 191, 166, 0.45);
border: 1px solid #ACE4D3;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 3px;
box-sizing: border-box;
padding: 30px 40px 15px 5px;
@media screen and (max-width: 600px) {
        margin-top: 100px;
    }
`

const ContainerInfos = styled.div`
    display:flex;
    justify-content: flex-end;
`
const InfoFooter = styled.div`
margin-left:100px;
  p{
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #262626;
  }
  `
const FinalText = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items:flex-end;
    h1{
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        align-items: center;
        color: #C7C7C7;

    }
`