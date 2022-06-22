import { Flex } from '@chakra-ui/react';
import CreatePostButton from './CreatePostButton';
import PostList from './PostList';

const HomePage = () => (
    <Flex paddingTop={8} direction='column'>
        <CreatePostButton />
        <PostList/>
    </Flex>
)

export default HomePage;