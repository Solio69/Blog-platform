/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';

import FormArticle from '../../components/FormArticle';

const CreateArticle = () => {

  const createArticle=(val)=>{
    console.log(val)
  }
  return <FormArticle callback={createArticle}/>;
};

export default CreateArticle;
