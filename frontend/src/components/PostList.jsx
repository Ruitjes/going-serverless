import { useEffect, useState } from "react";
import { http } from '../services/HttpClient';
import { Box } from '@chakra-ui/react';
import Post from './Post';

const PostList = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http
            .get('api/post/getAll')
            .then(resp => setPosts(resp.data))
            .catch(error => setError(error))
            .finally(setLoading(false));

    }, []);

    if (loading) {
        return <h1>Loading</h1>
    } else if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <Box>
            {posts.map((post) => (
                <Box
                    marginY={4}
                    key={post.id}>
                    <Post post={post} />
                </Box>
            ))}
        </Box>
    )
}

export default PostList;