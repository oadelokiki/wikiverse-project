import React from 'react';
import { Page } from './Page';

export const PagesList = ({pages,setPages, slug, setSlug	}) => {
	return <>
		{
			
			pages.map((page, idx) => {	
				return <Page slug={slug} setPages={setPages} setSlug={setSlug} page={page} key={idx} />
			})
		}
	</>
} 
