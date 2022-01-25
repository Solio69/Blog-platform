/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { CustomizedForm } from '../CustomizedForm/CustomizedForm';

// если значения переданы, то использует их
const CompletedForm = ({ transferData, title, description, articleTitle, articleBody, tagList }) => {
  const newFilds = [
    {
      name: ['title'],
      value: articleTitle || null,
    },
    {
      name: ['description'],
      value: description || null,
    },
    {
      name: ['body'],
      value: articleBody || null,
    },
    {
      name: ['tagList'],
      value: tagList && tagList.length ? tagList : [''],
    },
  ];

  const [fields, setFields] = useState(newFilds);

  useEffect(() => {
    setFields(newFilds);
  }, [title, description, articleTitle, articleBody, tagList]);

  return <CustomizedForm fields={fields} transferData={transferData} title={title} />;
};

export { CompletedForm };
