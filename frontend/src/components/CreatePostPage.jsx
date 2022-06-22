import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Text, Input, Stack, Textarea } from '@chakra-ui/react';
import { http } from '../services/HttpClient';
import FileUpload from './FileUpload';

const CreatePostPage = () => {

	const navigate = useNavigate();
	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const [file, setFile] = useState();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleTitleChanged = (e) => {
		setTitle(e.target.value);
	};

	const handleContentChanged = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);

		if (file) {
			formData.append('file', file);
		}

		http
			.postForm('api/post/create', formData)
			.then(() => navigate('/'))
			.catch(error => setError(error))
			.finally(setLoading(false))
	};

	return (
		<Box
			margin="auto"
			paddingTop={8}
			width={['100%', '90%', '80%', '70%']} >
			<form onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<FormControl>
						<Input
							value={title}
							variant='filled'
							onChange={handleTitleChanged}
							placeholder="title"
							isRequired
						/>
					</FormControl>
					<FormControl>
						<Textarea
							value={content}
							variant='filled'
							onChange={handleContentChanged}
							placeholder="text"
							isRequired
						/>
					</FormControl>
					<FormControl>
						<FileUpload file={file} setFile={setFile} />
					</FormControl>
					<Button
						type='submit'
						isLoading={loading}
						disabled={!title || !content}>
						Submit
					</Button>
				</Stack>
				{error && <Text>{error.message}</Text>}
			</form>
		</Box>
	);
};

export default CreatePostPage;