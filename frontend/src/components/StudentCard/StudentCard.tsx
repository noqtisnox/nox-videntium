import React from 'react';
import type { SubmissionStatus } from '../../types/types';

import placeholderImg from '@assets/img/rem-pfp.jpg';
import './StudentCard.css'; 

type Props = {
  id: string;
  name: string;
  submissionStatus: SubmissionStatus;
  onSelect?: () => void;
}

const StudentCard: React.FC<Props> = ({ id, name, submissionStatus, onSelect }) => {
  console.log(id);
  
  const statusClass = `status-strip is-${submissionStatus}`;
  
  return (
    <div className='student-card' role="button" tabIndex={0} onClick={onSelect} onKeyPress={(e) => { if (e.key === 'Enter') onSelect && onSelect(); }}>
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