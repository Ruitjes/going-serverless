import { useColorModeValue } from '@chakra-ui/react';
import { Box, Flex, Heading, Text, Tooltip, Image } from '@chakra-ui/react';
import moment from 'moment';


const Post = ({ post }) => {

	const postDetailColor = 'gray.500';
	const postBackgroundColor = useColorModeValue(
		'gray.50',
		'gray.700'
	);

	return (
		<Box
			padding={4}
			borderRadius="md"
			backgroundColor={postBackgroundColor}>
			<Flex>
				<Box>

					<Text
						as="span"
						color={postDetailColor}>
						{'Posted '}
					</Text>
					<Text
						as="span"
						color={postDetailColor}>
						<Tooltip label={moment(post.createdAt).format('LLLL')}>
							{moment(post.createdAt).fromNow()}
						</Tooltip>
					</Text>

					<Heading
						marginTop={2}
						marginBottom={4}
						fontSize="1.5em"
						fontWeight="500">
						{post.title}
					</Heading>

					<Box>
						{post.content}
						{post.imageURL && (
							<Image src={post.imageURL}/>
						)}
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default Post;