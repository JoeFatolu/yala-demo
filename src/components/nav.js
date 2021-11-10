import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Modal from 'react-modal';
import ReactSpeedometer from 'react-d3-speedometer';
import More from '../assets/images/dropdown.svg';
import Logo from './logo';
import { useAuth } from '../hooks';
import Button from '../components/Button';

Modal.setAppElement('#root');

const validationSchema = yup.object({
	bvn: yup.number().required(),
	location: yup.string(),
	education: yup.string(),
	employment: yup.string(),
	employmentYears: yup.string(),
	dependents: yup.string(),
	assets: yup.string(),
});

const ModalContent = styled.div`
	display: flex;

	.value {
		display: flex;
		height: 200px;
		justify-content: center;
		align-items: center;
		font-size: 40px;
	}
`;

const HeaderStyled = styled.header`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #f3f3ff;
	padding: 30px;
	background-color: #fff;

	h1,
	a {
		font-size: 13px;
		font-weight: 500;
		color: #666ee8;
		letter-spacing: 0.3px;
		text-transform: uppercase;
		text-decoration: none;
	}
`;

const MainStyled = styled.main`
	width: 100%;
	height: 100vh;
	text-align: center;
	transition: width 0.3s ease-in-out;

	/* &:hover {
		width: calc(100% - 450px);
	} */
`;
const FormWrapperStyled = styled.main`
	max-width: 480px;
	margin: 0 auto;
	padding: 30px 0;
`;

const FormStyled = styled.form`
	margin: 0 -30px;
	padding: 20px 30px 30px;
	border-radius: 4px;
	border: 1px solid #e8e8fb;

	button {
		display: block;
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
	}

	section {
		text-align: left;
	}

	.instruction {
		display: inline-table;
		margin-top: -32px;
		padding: 0 5px;
		text-align: center;
		background: #f8fbfd;
	}

	h2 {
		margin: 15 px 0;
		color: #32325d;
		text-transform: uppercase;
		-webkit-letter-spacing: 0.3px;
		-moz-letter-spacing: 0.3px;
		-ms-letter-spacing: 0.3px;
		letter-spacing: 0.3px;
		font-size: 13px;
		font-weight: 500;
	}

	fieldset {
		margin-bottom: 20px;
		background: #fff;
		box-shadow: 0 1px 3px 0 rgb(50 50 93 / 15%), 0 4px 6px 0 rgb(112 157 199 / 15%);
		border-radius: 4px;
		border: none;
		font-size: 0;
	}

	label {
		position: relative;
		display: flex;
		flex-direction: row;
		height: 42px;
		padding: 10px 0;
		align-items: center;
		justify-content: center;
		color: #8898aa;
		font-weight: 400;

		&:not(:last-child) {
			border-bottom: 1px solid #f0f5fa;
		}
		span {
			min-width: 125px;
			padding: 0 15px;
			text-align: right;
		}
		.field {
			flex: 1;
			padding: 0 15px;
			background: transparent;
			font-weight: 400;
			color: #31325f;
			outline: none;
			cursor: text;
			border-style: none;

			&::-webkit-input-placeholder {
				color: #aab7c4;
			}
			&::-moz-placeholder {
				color: #aab7c4;
			}
			&:-ms-input-placeholder {
				color: #aab7c4;
			}
		}
	}

	select {
		flex: 1;
		border-style: none;
		appearance: none;
		outline: none;
		color: #313b3f;
		cursor: pointer;
		background: transparent;
		width: 100%;
		&:focus {
			color: #666ee8;
		}
	}
	fieldset .select::after {
		content: '';
		position: absolute;
		width: 9px;
		height: 5px;
		right: 20px;
		top: 50%;
		margin-top: -2px;
		background-image: url(${More});
		pointer-events: none;
	}
`;

export function Header() {
	return (
		<HeaderStyled>
			<h1 className="shop">Yala Credit Scrore Demo</h1>
			<Logo />
			<a className="github" href="https://github.com/JoeFatolu/yala-demo.git">
				View on GitHub
			</a>
		</HeaderStyled>
	);
}

function FormWrapper({ children }) {
	return <FormWrapperStyled>{children}</FormWrapperStyled>;
}

export function Main() {
	return (
		<MainStyled>
			<Header />
			<FormWrapper>
				<Form />
			</FormWrapper>
		</MainStyled>
	);
}

function Form() {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [result, setResult] = React.useState({});

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	async function handleSubmit(a) {
		await axios
			.post('http://localhost:3000/getcreditscore', a)
			.then((res) => {
				const data = res.data;
				setResult(data);
				openModal();
			})
			.catch((res) => {
				return {
					data: {
						success: false,
						message: 'Something went wrong',
					},
				};
			});
	}

	const api = useAuth(handleSubmit);

	const form = useFormik({
		validationSchema: validationSchema,
		initialValues: {
			bvn: '',
			location: '',
			education: '',
			employment: '',
			employmentYears: '',
			dependents: '',
			assets: '',
		},
		onSubmit: async (a) => {
			// const data = useAuth()
			api.request(a);
		},
	});

	return (
		<FormStyled onSubmit={form.handleSubmit}>
			<p className="instruction">
				<span>Complete</span>/<span id="generate">generate</span> your shipping and payment details below
			</p>
			<section>
				<h2>Shipping &amp; Billing Information</h2>
				<fieldset>
					<label>
						<span>BVN</span>
						<input name="bvn" value={form.values.bvn} onChange={form.handleChange} className="field" placeholder="Enter your bvn" required />
					</label>

					<label className="select">
						<span>Location</span>
						<div id="state" className="field ">
							<select name="location" value={form.values.location} onChange={form.handleChange}>
								<option>-- Select option --</option>

								<option value="LA">Lagos</option>
								<option value="FE">Abuja</option>
								<option value="BE">Rivers</option>
								<option value="OY">Oyo</option>
								<option value="DE">Delta</option>
								<option value="AN">Anambra</option>
								<option value="EN">Enugu</option>
								<option value="OG">Ogun</option>
								<option value="KD">Kaduna</option>
								<option value="KN">Kano</option>
								<option value="ON">Ondo</option>
								<option value="OS">Osun</option>
								<option value="IM">Imo</option>
								<option value="EK">Ekiti</option>
								<option value="CR">Cross River</option>
								<option value="AK">Akwa Ibom</option>
								<option value="AB">Abia</option>
								<option value="ED">Edo</option>
								<option value="Ek">Kogi</option>
								<option value="NA">Nassarawa</option>
								<option value="NI">Niger</option>
								<option value="BY">Bayelsa</option>
								<option value="EB">Ebonyi</option>
								<option value="TA">Taraba</option>
								<option value="KT">Katsina</option>
								<option value="SO">Sokoto</option>
								<option value="GO">Adamawa</option>
							</select>
						</div>
					</label>
					<label className="select">
						<span>Education</span>
						<div className="field">
							<select name="education" value={form.values.education} onChange={form.handleChange}>
								<option>-- Select option --</option>
								<option value="FL">First Leaving</option>
								<option value="SC">Secondary School</option>
								<option value="GD">Grad</option>
								<option value="PG">Post Grad</option>
							</select>
						</div>
					</label>
					<label className="select">
						<span>Emp. type</span>
						<div className="field">
							<select name="employment" value={form.values.employment} onChange={form.handleChange}>
								<option>-- Select option --</option>

								<option value="CS">Civil Servant</option>
								<option value="PR">Private</option>
								<option value="SE">Self Employed</option>
							</select>
						</div>
					</label>
					<label className="employmentYears" value={form.values.employmentYears} onChange={form.handleChange}>
						<span>Year of Emp.</span>
						<div className="field">
							<select name="employmentYears" value={form.values.employmentYears} onChange={form.handleChange}>
								<option>-- Select option --</option>

								<option value="001">&gt; 10</option>
								<option value="002">5 - 10</option>
								<option value="003">2 - 5</option>
								<option value="004">1 - 2</option>
								<option value="005">&lt; 1</option>
							</select>
						</div>
					</label>

					<label className="dependents">
						<span>Dependents</span>
						<div className="field">
							<select name="dependents" value={form.values.dependents} onChange={form.handleChange}>
								<option>-- Select option --</option>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</div>
					</label>

					<label className="assets" value={form.values.assets} onChange={form.handleChange}>
						<span>Assets</span>
						<div className="field ">
							<select name="assets" value={form.values.assets} onChange={form.handleChange}>
								<option>-- Select option --</option>

								<option value="RE">Real Estate</option>
								<option value="VE">Vehicle</option>
								<option value="FGE">Furniture/Gadgets/Electronics</option>
							</select>
						</div>
					</label>
				</fieldset>
			</section>

			<Button isLoading={api.loading} type="submit">
				Get Credit History
			</Button>

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" ariaHideApp={false}>
				<ModalContent>
					{result.data?.creditScore && (
						<div
							style={{
								width: '500px',
								height: '300px',
							}}
						>
							<ReactSpeedometer
								fluidWidth={true}
								minValue={0}
								maxValue={100}
								width={500}
								needleHeightRatio={0.7}
								value={result.data.creditScore}
								currentValueText="Credit Score"
								customSegmentLabels={[
									{
										text: 'Very Bad',
										position: 'INSIDE',
										color: '#555',
									},
									{
										text: 'Bad',
										position: 'INSIDE',
										color: '#555',
									},
									{
										text: 'Ok',
										position: 'INSIDE',
										color: '#555',
										fontSize: '19px',
									},
									{
										text: 'Good',
										position: 'INSIDE',
										color: '#555',
									},
									{
										text: 'Very Good',
										position: 'INSIDE',
										color: '#555',
									},
								]}
								ringWidth={47}
								needleTransition="easeElastic"
								needleColor={'#90f2ff'}
								textColor={'#d8dee9'}
							/>
						</div>
					)}

					{!result.data?.creditScore && <div className="value">{result.data}</div>}
					<div className="value">Your credit score is {result.data?.creditScore}</div>
				</ModalContent>
			</Modal>
		</FormStyled>
	);
}
