/* eslint-disable no-unused-vars */
import { useLoaderData, useParams } from 'react-router-dom'
import Article from './postt';


function CurrentPost() {
    const {id} = useParams();
    const currentP = useLoaderData()  

  return (
    <div>
        {currentP.map(pp => (
            <Article key={pp.id} title={pp.title} author={pp.User.username} content={pp.content} image={pp.imageURL}
            category={pp.Category.name } id={pp.id}/>
        ))}
    </div>
  )
}

export default CurrentPost

export const currentPostLoader = async ({params}) => {
    const {id} = params

    const res = await fetch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${id}`)

    return res.json()
}


  