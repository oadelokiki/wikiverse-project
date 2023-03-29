import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';



export const App = () => {

	const [pages, setPages] = useState([]);

	const [slug, setSlug]	= useState("");
	
	

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
	

	
	return (
		<main>	
			<script src="http://localhost:8097"></script>
		<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>

		<h2>{(slug != "") ? "this works" : "no it doesnt"}</h2>

		{(pages.id != null) ?<div> <h2>Title: {pages.title}</h2>

			<p>Author: {pages.author.name}</p>
			<p>Content: {pages.content}</p>
			<p>Tags: {pages.tags.map((tag) =>{return  <li> {tag.name} </li>} ) } </p>
			<p>Time Created: {pages.createdAt}</p> 

			<p><button onClick= {() => loadHomePage()}>Back to Wiki List</button></p>
			</div>
			:
			<PagesList setPages={setPages} slug={slug} setSlug={setSlug} pages={pages} />}
		</main>
	)
}
