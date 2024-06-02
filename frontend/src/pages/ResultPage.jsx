import React from 'react';
import { IpynbRenderer } from 'react-ipynb-renderer';
import 'react-ipynb-renderer/dist/styles/monokai.css';
import ipynb from '../assets/data.json'; 
import NavBar from '../components/NavBar';

const ResultPage = () => {
  return (
    <div className='flex flex-col h-screen'>
        <div className='flex-1 p-4'>
        <IpynbRenderer ipynb={ipynb} syntaxTheme="xonokai" language="python" />
        </div>
    </div>
  );
};

export default ResultPage;


