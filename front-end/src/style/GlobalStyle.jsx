import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	button {
		height: 43px;
		background: #E8833A;
		border-radius: 3px;
		border-style: none;
		font-family: 'Roboto';
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		padding: 0 20px;
		&:disabled {
			background-color: lightgray;
		}
	}

	body {
		margin: 0;
		padding: 0;
		font-family: 'Open Sans', sans-serif;
	}
	input {
		background: #FFFFFF;
		border: 1px solid #D5D5D5;
		border-radius: 3px;
		height: 50px;
		margin-bottom: 25px;
		margin-top: 10px;
		padding: 0 10px;
		font-family: 'Roboto';
		font-size: 18px;
		display: flex;
		align-items: center;
		&::placeholder{
			font-style: italic;
		}
		
	}
`

export default GlobalStyle