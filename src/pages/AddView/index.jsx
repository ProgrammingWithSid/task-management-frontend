import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Import useLocation
import { InputText } from '../../component/InputText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addviewpage } from '../../store/listview/listviewthunk';
import { generateApiUrl } from '../../api/apihelper';
import { useDispatch } from 'react-redux';
import './AddView.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateviewpage } from '../../store/listview/listviewthunk'

const initialValues = {
    taskName: "",
    description: "",
};

const AddView = () => {
    const dispatch = useDispatch();
    const location = useLocation(); // Get the location object
    const [taskData, setTaskData] = useState(initialValues);
    const navigate = useNavigate();


    useEffect(() => {
        // Update taskData when the location state changes
        if (location.state) {
            setTaskData(location.state);
        }
    }, [location.state]);

    const task = useFormik({
        enableReinitialize: true,
        initialValues: taskData,
        onSubmit: async (values) => {
            try {
                console.log(values);
                if (taskData.uuid) {
                    // If uuid is present, it's an update (PUT) request

                    const apiUrls = generateApiUrl('tasks')
                    const params = taskData.uuid
                    const final = apiUrls + params + '/'

                    console.log(generateApiUrl(`tasks/${taskData.uuid}`));
                    await dispatch(updateviewpage(final, values));
                    toast.success('Task updated successfully!');
                } else {
                    // If uuid is not present, it's a create (POST) request
                    await dispatch(addviewpage(generateApiUrl('tasks'), values));
                    toast.success('Task created successfully!');
                }
                setTimeout(() => {
                    navigate('/listview');
                }, 2000);
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error('An error occurred while submitting the form.');
            }
        },
        validationSchema: Yup.object().shape({
            taskName: Yup.string().required("Task name is required"),
            description: Yup.string().required("Description is required"),
        }),
    });


    return (

        <div className="card-container">
            <ToastContainer
                autoClose={2000}
                position="top-right"
                icon={true}
            />
            <div className="card" style={{ backgroundColor: '#F9D288' }}>
                <div className="card-header">
                    {taskData.uuid ? (
                        <h2 style={{ color: 'black' }}>Edit Task</h2>
                    ) : (
                        <h2 style={{ color: 'black' }}>Add A New Task</h2>
                    )}
                </div>


                <div className="card-body" style={{ width: '100%' }}>
                    <form onSubmit={task.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="taskName">Task Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskName"
                                name="taskName"
                                placeholder="Enter task name"
                                value={task.values.taskName}
                                onChange={task.handleChange}
                                onBlur={task.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Enter description"
                                value={task.values.description}
                                onChange={task.handleChange}
                                onBlur={task.handleBlur}
                            />
                        </div>
                        <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Link to="/listview" className="btn btn-primary">
                                Back
                            </Link>
                            <button className="btn btn-primary" type="submit" style={{ backgroundColor: 'brown' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddView;
