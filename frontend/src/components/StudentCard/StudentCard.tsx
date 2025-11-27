import React from 'react';

import placeholderImg from '@assets/img/rem-pfp.jpg';


type SubmissionStatus = 'none' | 'submitted' | 'late' | 'graded';

type Props = {
  id: string;
  name: string;
  submissionStatus: SubmissionStatus;
}

const StudentCard: React.FC<Props> = ({ id, name, submissionStatus }) => {
  console.log(id);  // placeholder for now
  
  let submissionClass = '';
  
  switch (submissionStatus) {
    case 'submitted':
      submissionClass = 'bg-blue-300';
      break;
    case 'late':
      submissionClass = 'bg-red-500';
      break;
    case 'none':
      submissionClass = 'bg-yellow-300';
      break;
    case 'graded':
      submissionClass = 'bg-green-400';
      break;
    default:
      submissionClass = 'bg-red-500';
      break;
  }
  
  return (
    <div className='bg-white relative inline-block m-4 border-2 rounded-2xl p-2 pr-8 cursor-default hover:translate-x-4 hover:transition hover:ease-in-out'>
      <span className='flex flex-row items-center'>
        <img 
          className='w-16 h-auto border-2 border-r-black rounded-full'
          src={placeholderImg}
          alt='Student PFP'
        />
        <p className='text-2xl m-4'>{name}</p>  
      </span>
      <span className={`absolute top-0 right-0 bottom-0 h-full w-6 ${submissionClass} rounded-r-xl`}></span>
    </div>
  );
}

export default StudentCard;