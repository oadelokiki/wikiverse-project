import React from 'react';
import apiURL from '../api';

export const Page = ({setSlug, slug, page, setPages}) => {

	

	async function loadPage() {

	try{
		await setSlug(page.slug)	

		console.log("Page level state of slug: " + slug)
		console.log("What the current slug should be: " + page.slug)
		
		const newpage = await fetch(apiURL + '/wiki/' + page.slug)
		let data = await newpage.json();
		
		console.log(data);
		setPages(data);

		
	}
		catch(error){
			console.log(error)
		}
	}	

  return <>
    <button onClick = {() => loadPage()}> 
		<h3> {page.title} </h3> 
	</button>
  </>
} 
	
