import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabsContainer = styled.div`
	width: 100%;
`;
const TabsHeader = styled.div`
	display: inline-flex;
	list-style: none;
	width: 50%;
	justify-content: space-around;
`;
const Tab = styled.div`
	position: relative;
	border: 1px solid #cacaca;
	text-align: center;
	line-height: 25px;
	padding: 0.5rem;
	width: 100%;
	outline: none;
	margin-bottom: 0.625rem;

	&:first-child {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	&:last-child {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	&.selected {
		border-bottom: 2px solid blue;
	}
`;

const Tabs = ({selected, children}) => {

		const [state, setState] = useState ({
			selected: selected || 0
		});
	

	const handleChange = (index) => {
		setState({ selected: index });
	}

		return children ? (
			<TabsContainer className="tabs">
				<TabsHeader className="tabs-header">
					{children.map((content, index) => {
						let selected = index == state.selected ? "selected" : "";
						return (
							<Tab
								className={`tab ${selected}`}
								key={index}
								onClick={() => handleChange(index)}>
								{content.props.title}
							</Tab>
						);
					})}
				</TabsHeader>
				<div className="tab-content">
					{children[state.selected]}
				</div>
			</TabsContainer>
		) : null;
	}


export default Tabs;
