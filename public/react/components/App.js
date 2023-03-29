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
//these control states for the form inputs
	
	const [title, setTitle] = useState("")
        const [content, setContent] = useState("")
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
//TODO While tags will be given to us as a string, the string should be .split / delimited on spaces and/or mapped to an array.
	const [tags, setTags] = useState("")

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
	

	const handleSubmit = async (e) => {
		//what I'm gonna want to do here, is preveent default behavior
		//create a nice post request using the fetch api
		//expect some response from my server ? make a state change that lets my user know the status of their submission
		//send the user back to the wiki??
		//OR
		//Let them add another item 
		e.preventDefault()
		console.log(e.values)

		setName(name);
		setTitle(title);
		setContent(content);
		setEmail(email);
		setTags(tags);
		
		console.log(tags)
		console.log(typeof(tags))
		

		const articleData = {
			title: title,
			name: name,
			content: content,
			email: email,
			tags : tags,
		}

		const response = await fetch(`${apiURL}/wiki/`, {
			method:"POST",
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify(
				articleData 
			)
		});
	
		const data = await response.json();
		console.log(data);

		setName("");
                setTitle("");
                setContent("");
                setEmail("");
                setTags("");

		setIsAddingAnItem(false)
		loadHomePage()

	}



	const addOrListPages = () => {
		const result = (isAddingAnItem == false) ? <div> <PagesList setPages={/*where I load all articles*/setPages} slug={slug} setSlug={setSlug} pages={pages} /> <button onClick = {() => {setIsAddingAnItem(true); console.log(isAddingAnItem)} }> Add an item </button>  <button onClick = {() => {setIsAddingAnItem(false); loadHomePage()}}> Back to Wiki</button>
</div> 
                                :
                        <div>
				<form onSubmit={handleSubmit}>


                                	<input onChange = {(e) => setTags(e.target.value)} placeholder="tags" value= {tags}></input>
					<input onChange = {(e) => setTitle(e.target.value)} placeholder="title"  value = {title}></input>
					<input onChange = {(e) => setContent(e.target.value)} placeholder="content"  value = {content}></input>
                                	<input onChange = {(e) => setName(e.target.value)} placeholder="name" value = {name}></input>
                                	<input onChange = {(e) => setEmail(e.target.value)} placeholder="email" value = {email}></input>
					
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
			<h2>An OLUS Project 📚</h2>



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
