import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import useToken from '../../hooks/useToken';

// eslint-disable-next-line react/prop-types
export default function CreateProduct({ setAddSelected, setAttProducts }) {
  const [categories, setCategories] = useState([]);
  const [category, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tag, setSelectedTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [launch, setLaunch] = useState(false);
  const [emphasis, setEmphasis] = useState(false);
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const response = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/categories`);
    response.then((res) => {
      setCategories(res.data)
      console.log(res.data);
    });
    response.catch((err) => console.log(err));

    const result = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/tags`);
    result.then((res) => {
      setTags(res.data);
    });
    result.catch((err) => console.log(err));
  }, []);

  async function addProduct(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', parseFloat(price).toFixed(2));
    formData.append('quantity', parseInt(quantity));
    formData.append('photo', image);
    formData.append('categoryId', parseInt(category));
    formData.append('tagId', parseInt(tag));
    formData.append('launch', launch);
    formData.append('emphasis', emphasis);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/admin/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          },
      );
      console.log(response);
      console.log(response.data);
      navigate('/admin');
      setAddSelected(false);
      setAttProducts(true)
    } catch (err) {
      alert(err.response.data.message);
      setTitle('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setImage('');
      setSelectedCategory('');
      setSelectedTag('');
      setLaunch(false);
      setEmphasis(false);
    }
  }

 return (
  <>
                <Container>
     <p>Preencha as informações do novo produto 💎 </p>
      <StyledForm onSubmit={addProduct}>
      <Label htmlFor="title">Título:</Label>
        <StyledInput
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Label htmlFor="description">Descrição:</Label>
        <StyledInput
          name="description"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <Label htmlFor="price">Preço:</Label>
        <StyledInput
          name="price"
          placeholder="R$ 0,00"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <Label htmlFor="storage">Estoque:</Label>
         <StyledInput
          name="storage"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
         <Label htmlFor="categoryId">Categoria:</Label>
      <StyledSelect
      name="categoryId"
      value={category}
      onChange={e => setSelectedCategory(e.target.value)}
    >
      <option value="">Selecione uma categoria</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </StyledSelect>
    <Label htmlFor="tagId">Tag:</Label>
      <StyledSelect
        id="tagId"
        name="tagId"
        value={tag}
        onChange={e => setSelectedTag(e.target.value)}
      >
        <option value="">Selecione uma tag</option>
        {tags.map(tag => (
          <option key={tag.id} value={tag.id}>
            {tag.title}
          </option>
        ))}
      </StyledSelect>
      <CheckboxContainer>
          <CheckboxLabel htmlFor="launch">
            Lançamento:
          </CheckboxLabel>
          <StyledCheckbox
            type="checkbox"
            id="launch"
            checked={launch}
            onChange={(e) => setLaunch(e.target.checked)}
          />

          <CheckboxLabel htmlFor="emphasis">
            Em Destaque:
          </CheckboxLabel>
          <StyledCheckbox
            type="checkbox"
            id="emphasis"
            checked={emphasis}
            onChange={(e) => setEmphasis(e.target.checked)}
          />
        </CheckboxContainer>
      <Label htmlFor="tagId">Imagem (selecione um arquivo jpg, jpeg ou png):</Label>
      <StyledInput
          name="image"
          placeholder="Selecione um arquivo(jpg, jpeg ou png)"
          type="file"
          onChange={e => setImage(e.target.files[0])}
          required
        />
        <br></br>
{image ? <img src={URL.createObjectURL(image)} alt="Imagem" width="200" height="300" /> : <img src={logo} alt="Imagem" width="200" height="300" />}<br /><br />

        
        <StyledButton type="submit">
          Cadastrar Produto
        </StyledButton>
      </StyledForm>
      <StyledLink onClick={() => {
  console.log('setAddSelected(true)'); // Verifica se a função está sendo chamada
  setAddSelected(false);
}}>
      Quer retornar para a lista de produtos? <span>Clique aqui</span>
      </StyledLink>
    </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 10px;
  p{
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  h2{
    margin-top: 30px;
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  /* @media screen and (min-width: 800px) {
    img {
      margin-top: 100px;
    }
  } */
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
  @media screen and (max-width: 600px) {
    width: 80%;
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
  @media screen and (max-width: 600px) {
    width: 50%;
}
`

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  width: 30%;
  font-size: 16px;
  margin-bottom: 8px;
`;

const StyledSelect = styled.select`
  width: 32%;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ace4d3;
  border-radius: 5px;
  font-size: 16px;
  line-height: 25px;
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  background-color: ${(props) => (props.disabled ? "#f2f2f2" : "#ffffff")};
  color: ${(props) => (props.disabled ? "#afafaf" : "#666666")};

  &::placeholder {
    color: #000000;
    font-weight: 400;
    font-size: 8px;
    line-height: 23px;
  }
  ::-webkit-input-placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6cbfa6;
  }
  @media screen and (max-width: 600px) {
    width: 80%;
}
`;

const StyledLink = styled.div`
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  span{
    font-weight: 900;
  }
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.label`
  margin-right: 8px;
`;

const StyledCheckbox = styled.input`
  margin-right: 8px;
`;
