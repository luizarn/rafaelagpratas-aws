import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const navigate = useNavigate()


  async function addUser(e) {
    e.preventDefault()
    const body = {
      name, surname, cpf, email, password, phone: phone.replace(/[^0-9]+/g, '').replace(/^(\d{2})(9?\d{4})(\d{4})$/, '($1) $2-$3'),
    }

    if (password !== confirmPassword) {
      alert ('As senhas devem ser iguais!');

    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, body)
        console.log(response)
        console.log(response.data)
        navigate("/sign-in")
      } catch (err) {
        alert(err.response.data.message)
        setName("")
        setPassword("")
        setconfirmPassword("")
        setEmail("")
      }
    }
  }

  return (
    <Container>
     <p>Criar uma conta</p>
      <StyledForm onSubmit={addUser}>
        <StyledInput
          name="name"
          placeholder="Nome"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <StyledInput
          name="surname"
          placeholder="Sobrenome"
          type="text"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
        />
        <StyledInput
          name="cpf"
          placeholder="CPF"
          type="number"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
        />
         <StyledInput
          name="celular"
          placeholder="Celular (  )____-____"
          type="number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <StyledInput
          name="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <StyledInput
          name="password"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <StyledInput
          data-test="conf-password"
          name="confirmpassword"
          placeholder="Confirme a senha"
          type="password"
          value={confirmPassword}
          onChange={e => setconfirmPassword(e.target.value)}
          required
        />
        <StyledButton data-test="sign-up-submit" type="submit">
          Cadastrar
        </StyledButton>
      </StyledForm>

      <StyledLink to="/sign-in">
        Já tem uma conta? <span>Entre agora!</span>
      </StyledLink>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  margin: 30px auto;
  p{
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  img {
    margin-top: 65px;
    width: 150px; 
    height: 150px; 
    border-radius: 50%; 
    background-color: #6ad0af;
  }
  @media screen and (min-width: 800px) {
    img {
      margin-top: 100px;
    }
  }
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0 25px;
`
const StyledInput = styled.input`
  width: 30%;
  height: 15px;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ACE4D3;
  border-radius: 5px;
  font-size: 16px;
  line-height: 25px;
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  background-color: ${(props) => props.disabled ? "#F2F2F2" : "#FFFFFF"};
  color: ${(props) => props.disabled ? "#AFAFAF" : "#666666"};
  &::placeholder{
    color:  #000000;
    font-weight: 400;
    font-size: 12px;
    line-height: 23px;
  }
  @media screen and (max-width: 800px) {
      width: 60%;
  }
`

const StyledButton = styled.button`
  width: 30%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  background: rgba(108, 191, 166, 0.9);
  border: 1px solid #ACE4D3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  color: #FFFFFF;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  span{
    font-weight: 700;
  }
`