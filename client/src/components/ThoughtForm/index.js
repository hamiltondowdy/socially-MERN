import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import "./style.css";

const ThoughtForm = () => {

    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought } }) {
      
            // could potentially not exist yet, so wrap in a try/catch
          try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
            });
          } catch (e) {
            console.warn("First thought insertion by user!")
          }
      
          // update thought array's cache
          const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
          cache.writeQuery({
            query: QUERY_THOUGHTS,
            data: { thoughts: [addThought, ...thoughts] },
          });
        }
      });

    const [thoughtText, setText] = useState('');
const [characterCount, setCharacterCount] = useState(0);

const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add thought to database
      await addThought({
        variables: { thoughtText }
      });
  
      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <div>
           
        <div id='tfhead'>
        <h3></h3>
        </div>
        <div id='former'>
<form
  className="flex-row justify-content-space-evenly-md align-stretch"
  onSubmit={handleFormSubmit}
>

      <textarea
  placeholder=">"
  value={thoughtText}
  className="form-input col-6 col-md-5"
  onChange={handleChange}
></textarea>
        <button className="btn col-6 col-md-1" id='t-b' type="submit">
          Post
        </button>
      </form>
    </div>
    <div className='flex-row'>
    <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`} id='chars'>
     {characterCount}    (max 280) 
  {error && <span className="ml-1">Something went wrong...</span>}
</p>
    </div>
      </div>
    
  );
};

export default ThoughtForm;