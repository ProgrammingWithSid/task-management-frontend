import React from 'react';
import '../scss/card.css';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import { ReactComponent as ViewIcon } from '../assets/view.svg';


const ExpertCard = ({ taskName, description, editHandle, viewHandle, deleteHandle, uuid }) => {
  return (
    <div className="prediction-card">
        <div className="card-top" ></div>
      <div className="card-content">
        <h2>{taskName}</h2>
        <p className='text-dark'>{description}</p>
        <div className='card-buttons'>
            <div className='edit-button'>
            <EditIcon
            width="25"
            height="25"
            onClick={() => editHandle(uuid, taskName, description)}
            />
            <DeleteIcon
            width="25"
            height="25"
            className='delete-button'
            onClick={() => deleteHandle(uuid)}
            />
            {/* Add a View button/icon and attach the viewHandle function */}
            <ViewIcon
                width="35"
                height="55"
            className='view-button'
            onClick={() => viewHandle(uuid)}
            />

        </div>
        </div>
      </div>

      
    </div>
  );
};

export default ExpertCard;

//        <div className="card-top" style={{ backgroundColor: 'red', height: '3px' }}></div>
