import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import useToken from '../../hooks/useToken';

// eslint-disable-next-line react/prop-types
export default function EditProduct({ setAttProducts, setEditSelected, selectedProductId, selectedProductTitle }) {
  const [categories, setCategories] = useState([]);
  const [category, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tag, setSelectedTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [imageDb, setImageDb] = useState('');
  const [launch, setLaunch] = useState(false);
  const [emphasis, setEmphasis] = useState(false);
  const token = useToken();

  console.log(image)
  useEffect(() => {
    console.log(selectedProductTitle)
    const response = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/categories`);
    response.then((res) => {
      setCategories(res.data);
    });
    response.catch((err) => console.log(err));

    const result = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/tags`);
    result.then((res) => {
      setTags(res.data);
    });
    result.catch((err) => console.log(err));

    const resultInformationsProduct = axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/category/${selectedProductTitle}`);
    resultInformationsProduct.then((res) => {
      console.log(res.data)
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPrice(res.data.price)
      setQuantity(res.data.quantity)
      setImage(res.data.publicUrl)
      setSelectedCategory(res.data.categoryId)
      setSelectedTag(res.data.tagId)
      setLaunch(res.data.launch)
      setEmphasis(res.data.emphasis)
    });
    resultInformationsProduct.catch((err) => console.log(err));
  }, []);



  async function editProduct(e) {
    e.preventDefault();
    console.log('Clicou em Editar Produto');
  
    const requestBody = {
      updatedFields: {
      title,
      description,
      price: parseFloat(price).toFixed(2).replace(',', '.'),
      quantity: parseInt(quantity),
      categoryId: parseInt(category),
      tagId: parseInt(tag),
      launch,
      emphasis,
      ...(imageDb && { photo: imageDb })
      }
    };
  
    
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/products/admin/${selectedProductId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
  
      console.log('Response:', response);
      console.log('Response Data:', response.data);
      setEditSelected(false);
      setAttProducts(true)
    } catch (err) {
      console.log('Error:', err);
      alert(err.response?.data?.message || 'Erro ao editar o produto');
      setTitle('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setImage('');
      setSelectedCategory('');
      setSelectedTag('');
    }
  }

  return (
    <>
      <Container>
        <p>Edite as informações do produto 💎 </p>
        <StyledForm onSubmit={editProduct}>
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
          <Label htmlFor="tagId">Imagem (selecione um arquivo jpg, jpeg ou png):</Label>
          <StyledInput
            name="image"
            placeholder="Selecione um arquivo (jpg, jpeg ou png)"
            type="file"
            onChange={e => setImageDb(e.target.files[0])}
          />
          <br></br>
          {imageDb ? (
          <img src={URL.createObjectURL(imageDb)} alt="Imagem" width="200" height="300" /> ) : (
          <img src={image} alt="Imagem" width="200" height="300" />)
           }<br /><br />
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

          <StyledButton type="submit">
            Editar Produto
          </StyledButton>
        </StyledForm>
        <StyledLink onClick={() => {
  console.log('setEditSelected(true)'); // Verifica se a função está sendo chamada
  setEditSelected(false);
}}>
      Quer retornar para a lista de produtos? <span>Clique aqui</span>
      </StyledLink>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 10px;
  p {
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
  h2 {
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
`;



const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0 25px;
`;

const StyledInput = styled.input`
  width: 30%;
  height: 15px;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ACE4D3;
  border-radius: 5px;
  font-size: 16px;
  line-height: 25px;
  pointer-events: ${props => props.disabled ? "none" : "all"};
  background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF"};
  color: ${props => props.disabled ? "#AFAFAF" : "#666666"};
  &::placeholder {
    color:  #000000;
    font-weight: 400;
    font-size: 12px;
    line-height: 23px;
  }
`;

const StyledButton = styled.button`
  width: 30%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  pointer-events: ${props => props.disabled ? "none" : "all"};
  opacity: ${props => props.disabled ? 0.7 : 1};
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  background: rgba(108, 191, 166, 0.9);
  border: 1px solid #ACE4D3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  color: #FFFFFF;
`;

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
  pointer-events: ${props => props.disabled ? "none" : "all"};
  background-color: ${props => props.disabled ? "#f2f2f2" : "#ffffff"};
  color: ${props => props.disabled ? "#afafaf" : "#666666"};

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
`

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
