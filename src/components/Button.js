import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
	0% { transform: rotate(0deg);}
	100% { transform: rotate(360deg);}
`;

const Spinner = styled(FaSpinner)`
	animation: ${spin} 1s linear infinite;
`;

const ButtonStyles = styled.button`
	background: #666ee8;
	color: #fff;
	box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
	border-radius: 4px;
	border: 0;
	font-weight: 700;
	width: 100%;
	height: 40px;
	outline: none;
	cursor: pointer;
	transition: all 0.15s ease;
`;
export default function Button({ children, isLoading, ...props }) {
	return <ButtonStyles {...props}>{!isLoading ? children : <Spinner />}</ButtonStyles>;
}
