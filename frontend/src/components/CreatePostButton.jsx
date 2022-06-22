import { Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreatePostButton = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/create');
    }

    return (
        <Button
            border='1px'
            padding={8}
            borderRadius={5}
            borderColor='gray.500'
            alignItems='center'
            justifyContent='center'
            onClick={handleClick}>
            <Heading>Create a new post</Heading>
        </Button>
    );
};

export default CreatePostButton;