import { DownloadIcon } from '@chakra-ui/icons';
import { Image, Text, Flex, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const FileUpload = ({ file, setFile }) => {

	const [filePreview, setFilePreview] = useState();

	const handleDragOver = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const { files } = e.dataTransfer;
		if (files && files.length) {
			setFile(files[0]);
			console.log(files[0]);
		}
	};

	const handleFileChanged = (e) => {
		if (e.target.files && e.target.files.length) {
			setFile(e.target.files[0]);
			console.log(e.target.files[0]);
		}
	};

	useEffect(() => {

		if (!file) {
			setFilePreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setFilePreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	return (
		<React.Fragment>
			<label>
				<Flex
					height={256}
					borderWidth={2}
					borderRadius='md'
					borderStyle='dashed'
					backgroundColor='whiteAlpha.50'
					justifyContent='center'
					alignItems='center'
					cursor='pointer'
					onDragOver={handleDragOver}
					onDrop={handleDrop}>
					{file ? (
						<Image height='full' padding={4} src={filePreview} />
					) : (
						<Stack alignItems='center'>
							<DownloadIcon width={8} height={8} />
							<Text><strong>Choose a file </strong>or drag it in here</Text>
						</Stack>
					)}
				</Flex>
				<input type="file" onChange={handleFileChanged} hidden />
			</label>
		</React.Fragment>

	);
};

export default FileUpload;