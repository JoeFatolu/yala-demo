import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";

import More from "../assets/images/dropdown.svg";

const validationSchema = yup.object({
	name: yup
		.string("Enter your email || AccountNumber || User ID")
		.required("name is required"),
	password: yup.string("Enter your password").required("Password is required"),
});

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
		box-shadow: 0 1px 3px 0 rgb(50 50 93 / 15%),
			0 4px 6px 0 rgb(112 157 199 / 15%);
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
		content: "";
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

			<a
				className="github"
				href="https://github.com/stripe/stripe-payments-demo"
			>
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
	return (
		<FormStyled>
			<p class="instruction">
				<span>Complete</span>/<span id="generate">generate</span> your shipping
				and payment details below
			</p>
			<section>
				<h2>Shipping &amp; Billing Information</h2>
				<fieldset>
					<label>
						<span>BVN</span>
						<input
							name="bvn"
							class="field"
							placeholder="Enter your bvn"
							required
						/>
					</label>

					<label className="select">
						<span>Location</span>
						<div id="state" className="field ">
							<select name="state">
								<option value="AU">Lagos</option>
								<option value="AT">Abuja</option>
								<option value="BE">Rivers</option>
								<option value="BR">Oyo</option>
								<option value="CA">Delta</option>
								<option value="CN">Anambra</option>
								<option value="DK">Enugu</option>
								<option value="FI">Ogun</option>
								<option value="FR">Kaduna</option>
								<option value="DE">Kano</option>
								<option value="HK">Ondo</option>
								<option value="IE">Osun</option>
								<option value="IT">Imo</option>
								<option value="JP">Ekiti</option>
								<option value="LU">Cross River</option>
								<option value="MY">Akwa Ibom</option>
								<option value="MX">Abia</option>
								<option value="NL">Edo</option>
								<option value="NZ">Kogi</option>
								<option value="NO">Nassarawa</option>
								<option value="PL">Niger</option>
								<option value="PT">Bayelsa</option>
								<option value="SG">Ebonyi</option>
								<option value="ES">Taraba</option>
								<option value="SE">Katsina</option>
								<option value="CH">Sokoto</option>
								<option value="GB">Adamawa</option>
							</select>
						</div>
					</label>
					<label className="select">
						<span>Education</span>
						<div class="field">
							<select name="edu">
								<option value="AU">First Leaving</option>
								<option value="AT">Secondary School</option>
								<option value="BE">Grad</option>
								<option value="BR">Post Grad</option>
							</select>
						</div>
					</label>
					<label class="select">
						<span>Emp. type</span>
						<div class="field">
							<select name="emp">
								<option value="AU">Civil Servant</option>
								<option value="AT">Private</option>
								<option value="BE">Self Employed</option>
							</select>
						</div>
					</label>
					<label class="select">
						<span>Year of Emp.</span>
						<div class="field">
							<select name="yrsemp">
								<option value="AU">&gt; 10</option>
								<option value="AT">5 - 10</option>
								<option value="BE">2 - 5</option>
								<option value="BR">1 - 2</option>
								<option value="BR">&lt; 1</option>
							</select>
						</div>
					</label>

					<label class="select">
						<span>Rental Value</span>
						<div class="field">
							<select name="rv">
								<option value="AU">Ownership</option>
								<option value="AT">Rental Apartment </option>
							</select>
						</div>
					</label>
					<label>
						<span>Rent Amount</span>
						<input name="ra" class="field" placeholder="100000.00" required />
					</label>
					<label className="select">
						<span>Dependents</span>
						<div class="field">
							<select name="dp">
								<option value="AU">Yes</option>
								<option value="AT">No</option>
							</select>
						</div>
					</label>
					<label className="select">
						<span>Assets</span>
						<div class="field ">
							<select name="as">
								<option value="AU">Real Estate</option>
								<option value="AT">Vehicle</option>
								<option value="BE">Furniture/Gadgets/Electronics</option>
							</select>
						</div>
					</label>
				</fieldset>
			</section>

			<button>Get Credit History</button>
		</FormStyled>
	);
}
