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
		{slug ? <h2>{pages}</h2>
			:
			<PagesList setPages={setPages} slug={slug} setSlug={setSlug} pages={pages} />}
		</main>
	)
}
