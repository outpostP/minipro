import { useLoaderData, Link } from "react-router-dom"
import CardPost from '../cards/CardPost'

function Posts() {

  const posting = useLoaderData();
  const postingu = posting.result


  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
        {postingu.map(posti => (
          <Link to={posti.id.toString()} key={posti.id}> 
            <CardPost imageSrc={posti.imageURL} author={posti.User.username} title={posti.title} />
          </Link>
        ))}
    </div>
  )
}

export default Posts

export const postLoaders = async () => {
  const res = await fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog/')

  return res.json()
}