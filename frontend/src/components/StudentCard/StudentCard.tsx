import React from 'react';
import type { SubmissionStatus } from '@types/types';

import placeholderImg from '@assets/img/rem-pfp.jpg';
import './StudentCard.css'; 

type Props = {
  id: string;
  name: string;
  submissionStatus: SubmissionStatus;
}

const StudentCard: React.FC<Props> = ({ id, name, submissionStatus }) => {
  console.log(id); 
  
  const statusClass = `status-strip is-${submissionStatus}`;
  
  return (
    <div className='student-card'>
      <span className='student-card__content'>
        <img 
          className='pfp-image'
          src={placeholderImg}
          alt='Student PFP'
        />
        <p className='student-name'>{name}</p>  
      </span>
      
      <span className={statusClass}></span>
    </div>
  );
}

export default StudentCard;