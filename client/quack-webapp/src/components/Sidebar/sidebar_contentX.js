import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles/styles'
import { Component, Image, Text } from 'react'
import logo from '../../assets/quack-logo-white.svg'
import Routes from '../../routes'

const styles = {
	sidebar: {
		width: 256,
		height: '100%',
	},
	sidebarLink: {
		display: 'block',
		padding: '10px 0px',
		textDecoration: 'none',
		fontFamily: 'Fira Sans',
		color: 'white',
		fontSize: '12pt',
		fontWeight: 'regular',
		textAlign: 'left',
	},
	divider: {
		paddingTop: 0,
		margin: 0,
		height: 1,
		backgroundColor: colors.qLightGrey,
	},
	links: {
		marginTop: '10px',
		padding: '10px',
		height: '100%',
		backgroundColor: colors.qDarkGrey,
		justifyContent: 'flex-start',
	},
	content: {
		height: '100%',
		backgroundColor: colors.qDarkGrey,
	},
	logoContainer: {
		width: '100%',
		height: '80px',
		display: 'flex',
		backgroundColor: colors.qGreen,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: '130px',
		height: '100%',
	},
	title: {
		fontFamily: 'Fira Sans',
		color: 'white',
		fontSize: '18pt',
		fontWeight: 'bold',
		textAlign: 'left',
		paddingBottom: 0,
	},
	addCourseButton: {
		backgroundColor: colors.qDarkGrey,
		border: 0,
		fontFamily: 'Fira Sans',
		color: 'white',
		fontSize: '11pt',
		textAlign: 'left',
	}
};

const SidebarContent = (props) => {
	const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;
	const links = [];

	//for server implementation, pass in a list of courseIDs using a prop, then here use a map function to create the links
	for (let ind = 0; ind < 3; ind++) {
		var courseID=ind.toString()

		links.push(
			<a key={ind} href={'/course/' + courseID}
				style={styles.sidebarLink}
			>
				Course
				{ind}
			</a>
		);
	}

	return (
		<div style={styles.content}>
			<div style={styles.logoContainer}>
				<img src={logo} style={styles.logo}/>
			</div>

			<div style={styles.links}>
				<h1 style={styles.title}>Courses</h1>

				<div style={styles.divider}/>

				{links}

				<button onClick={ addCourse } style={styles.addCourseButton}>+ Add course</button>
			</div>
		</div>
	);
};

function addCourse() {
    console.log("addCourse clicked");
}

SidebarContent.propTypes = {
  	style: PropTypes.object,
};

export default SidebarContent;