import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import Link
import './DetailsView.css'; // Import your CSS for styling
import ExpertCard from '../../component/card';
import { useDispatch } from 'react-redux';
import { deleteviewpage } from '../../store/listview/listviewthunk';
import { listviewpage } from '../../store/listview/listviewthunk';
import { generateApiUrl } from '../../api/apihelper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailsView = () => {
    const location = useLocation();
    const [taskData, setTaskData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedTask, setSelectedTask] = useState(null);


    useEffect(() => {
        // Update taskData when the location state changes
        if (location.state) {
            setTaskData(location.state);
        }
    }, [location.state]);


    const editHandle = (uuid, taskName, description) => {
        // Handle the edit action with the uuid here
        const selectedTaskData = { uuid, taskName, description };
        console.log(taskName, description)
        setSelectedTask(selectedTaskData);
        console.log(`Editing card with UUID: ${uuid}`);
        console.log(selectedTaskData);
        navigate('/addview', { state: selectedTaskData });
    }


    const deleteHandle = (uuid) => {
        console.log(`Deleting card with UUID: ${uuid}`);
        const apiUrls = generateApiUrl('tasks')
        const params = uuid
        const final = apiUrls + params + '/'
        dispatch(deleteviewpage(final, uuid))
        toast.success('Task Deleted successfully!');
        setTimeout(() => {
            navigate('/listview');
        }, 2000);
        
    }

    return (
        <div className="details-container">
            <ToastContainer
                autoClose={2000}
                position="top-right"
                icon={true}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ExpertCard
                    taskName={taskData.taskName}
                    description={taskData.description}
                    editHandle={() => editHandle(taskData.uuid, taskData.taskName, taskData.description)}
                    deleteHandle={() => deleteHandle(taskData.uuid)}
                    viewHandle={() => null}

                />
                <div style={{ marginTop: '20px' }}>
                    <Link to="/listview" className="btn btn-primary">
                        Back to List
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default DetailsView;
