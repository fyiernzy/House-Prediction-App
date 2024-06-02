import React from 'react';
import PredictionForm from '../components/PredictionForm';
import NavBar from '../components/NavBar';

const FormPage = () => {
  return (
    <div className='flex flex-col h-screen'>
        <div className='flex-1 p-4'>
        <PredictionForm />
        </div>
    </div>
  );
};

export default FormPage;

