import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';



export const App = () => {
//controls the state for the actual views/ page data --> grabbed directly from the api
	const [pages, setPages] = useState([]);

//controls state from the url --> meant for use with selecting specfici articles
	const [slug, setSlug]	= useState("");
//controls state for the "add an item" pop-up form
	const [isAddingAnItem, setIsAddingAnItem] = useState(false);

	async function fetchPages(slug2 = slug){
		try {
			console.log("Top level state of slug: " + slug2)

			const response = await fetch(`${apiURL}/wiki/${slug2}`);
			
			const pagesData = await response.json();

			setPages(pagesData);

		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}
	
	async function loadHomePage(){
		try{
			let homePageData = await fetch(`${apiURL}/wiki`)

			let homePagesData = await homePageData.json();

			setPages(homePagesData);

			setSlug("")
		}
		catch(err)
		{
			console.log(err)
		}
	}
	
	useEffect(() => {
                fetchPages(slug);
        }, []);
	

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(e)
	}

	const addOrListPages = () => {
		const result = (isAddingAnItem == false) ? <div> <PagesList setPages={/*where I load all articles*/setPages} slug={slug} setSlug={setSlug} pages={pages} /> <button onClick = {() => {setIsAddingAnItem(true); console.log(isAddingAnItem)} }> Add an item </button>  <button onClick = {() => {setIsAddingAnItem(false); loadHomePage()}}> Back to Wiki</button>
</div> 
                                :
                        <div>
				<form onSubmit={handleSubmit}>


                                	<input></input>
                                	<input></input>
                                	<input></input>
					<div> 
 
						<input type="submit" value="Add This Item"></input>
					</div>
	                        </form>	
				 
			</div>
			return result;

	}
	
	const toAddOrNotToAdd = addOrListPages();

	return (

		<main>	
			<script src="http://localhost:8097"></script>
		<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>



		<h2>{(pages.id != null) ? <div> <h2>Title: {pages.title}</h2>

			<p>Author: {pages.author.name}</p>
			<p>Content: {pages.content}</p>
			<p>Tags: {pages.tags.map((tag) =>{return  <li> {tag.name} </li>} ) } </p>
			<p>Time Created: {pages.createdAt}</p> 

			<button onClick = {() => {setIsAddingAnItem(false); loadHomePage()}}> Back to Wiki</button>

			</div>

			:

			<div>
				<p>{toAddOrNotToAdd}</p>
			{(isAddingAnItem == true) ? <button onClick = {() => {setIsAddingAnItem(false); loadHomePage()}}> Back to Wiki</button> : <p></p> }

			</div>
			
		
		}</h2>
		</main>
	)
}
