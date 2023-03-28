import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';



export const App = () => {

	const [pages, setPages] = useState([]);

	const [slug, setSlug]	= useState("");
	
	

	async function fetchPages(){
		try {
			console.log("Top level state of slug: " + slug)

			const response = await fetch(`${apiURL}/wiki/${slug}`);
			
			const pagesData = await response.json();

			setPages(pagesData);

		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	
	useEffect(() => {
                fetchPages();
        }, []);
	

	
	return (
		<main>	
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>

		<h2>{(slug != "") ? "this works" : "no it doesnt"}</h2>
		{(pages.id != null) ?<div> <h2>Title: {pages.title}</h2>
			<p>Content: {pages.content}</p>
			<p>Author: {pages.author.name}</p>
			</div>
			:
			<PagesList setPages={setPages} slug={slug} setSlug={setSlug} pages={pages} />}
		</main>
	)
}
