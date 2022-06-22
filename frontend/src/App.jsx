import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import HomePage from './components/HomePage';
import CreatePostPage from './components/CreatePostPage';

const App = () => (
  <Router>
    <Flex justifyContent='center'>
      <Box width={['95%', '80%', '70%', '60%']}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePostPage /> } />
        </Routes>
      </Box>
    </Flex>
  </Router>
)

export default App;
