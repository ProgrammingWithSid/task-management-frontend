import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertCard from '../../component/card';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { listviewpage } from '../../store/listview/listviewthunk';
import { generateApiUrl } from '../../api/apihelper';
import './ListView.css'
import { deleteviewpage } from '../../store/listview/listviewthunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ListViewResp, ListViewErrorResp } = useSelector(
        (state) => ({
            ListViewErrorResp: state.listview.ListViewErrorResp,
            ListViewResp: state.listview.ListViewResp,
        }),
        shallowEqual
    );

    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        dispatch(listviewpage(generateApiUrl('tasks')));
    }, []);

    function AddViewHandle() {
        navigate('/addview');
    }

    const editHandle = (uuid, taskName, description) => {
        // Handle the edit action with the uuid here
        const selectedTaskData = { uuid, taskName, description };
        console.log(taskName, description)
        setSelectedTask(selectedTaskData);
        console.log(`Editing card with UUID: ${uuid}`);
        console.log(selectedTaskData);
        navigate('/addview', { state: selectedTaskData });
    }

    const viewHandle = (uuid) => {
        // Handle the view action with the uuid here
        const selectedTaskData = ListViewResp.find(item => item.uuid === uuid);
        console.log(`Viewing card with UUID: ${uuid}`);
        console.log(selectedTaskData);
        navigate('/detailview', { state: selectedTaskData });
    }

    const deleteHandle = (uuid) => {
        console.log(`Deleting card with UUID: ${uuid}`);
        const apiUrls = generateApiUrl('tasks')
        const params = uuid
        const final = apiUrls + params + '/'
        dispatch(deleteviewpage(final, uuid))
        toast.success('Task Deleted successfully!');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <div className='tasks-body'>
            <ToastContainer
                autoClose={2000}
                position="top-right"
                icon={true}
            />
            <div className='banner d-flex flex-column justify-content-center align-items-center'>
                <h1>Task Management</h1>
                <button
                    name="Create Task"
                    className="btn btn-primary"
                    onClick={AddViewHandle}
                style={{margin:'1%'}}>
                    Create Task
                </button>
            </div>

            <div className='container text-center' id='all-tasks-body'>
                <h2 className="all-tasks-heading" style={{margin:'1%'}}>All Tasks</h2>
                {ListViewResp ? (
                    ListViewResp.length === 0 ? (
                        <p>No tasks available.</p>
                    ) : (
                        <div className="card-wrapper mr-5 text-center">
                            {ListViewResp.map((item) => (
                                <ExpertCard
                                    key={item.uuid}
                                    taskName={item.taskName}
                                    //description={item.description}
                                    editHandle={() => editHandle(item.uuid, item.taskName, item.description)}
                                    deleteHandle={() => deleteHandle(item.uuid)}
                                    viewHandle={() => viewHandle(item.uuid)}
                                    uuid={item.uuid}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ListView;