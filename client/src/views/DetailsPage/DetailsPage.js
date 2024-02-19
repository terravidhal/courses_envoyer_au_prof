import React, { useEffect, useState } from 'react';
import './DetailsPage.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button';


const DetailsPage = () => {

  const [OneCourse, setOneCourse] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // check if the data is available

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/Courses/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleCourse);
          setOneCourse(res.data.oneSingleCourse);
          setLoaded(true); // data available => set "true"
          console.log("y++++++++++",OneCourse.students);
        })
        .catch( err => console.log(err) );
  }, [id]); 



  // delete One specific Course
  const deleteCourse = (CourseId) => {
    axios
      .delete("http://localhost:8000/api/Courses/" + CourseId,{withCredentials: true})
      .then((res) => {
        console.log(res.data);
        navigate("/Courses");
      })
      .catch((err) => console.log(err));
  };


 
  return(
    <div className="DetailsPage">
      <div className="page-top">
        <h1>Speedy Courses</h1>
         <Link to="/courses">
           back to Home
          </Link>
      </div>  
        
      <div className="page-top">
        <h2>{OneCourse.name} recipe</h2>
        <Button CourseId={OneCourse._id} create="" update="" 
        deletes="delete" 
        isActive={true}
        successCallback={() => deleteCourse(OneCourse._id)}/>
       <button onClick={() => deleteCourse(OneCourse._id)}>remove</button>
      </div>  
      <div className="page-content">
        <div className="fields">
            <p><span className='infos'>Level:</span>{OneCourse.level}</p>
            <p><span className='infos'>description:</span> {OneCourse.description}</p>
            <p><span className='infos'>instructor:</span> {OneCourse.instructor}</p>
            <p><span className='infos'>dayOfWeek:</span> {OneCourse.dayOfWeek}</p>
            <p><span className='infos'>Time:</span> {OneCourse.time} minutes</p>
            <p><span className='infos'>students:</span> 
               <ul>
                  { loaded === true ? 
                  OneCourse.students.map((id) => (
                    <li key={id}>
                      {id}
                    </li>
                  )) : null
                } 
               </ul>
            </p>
        </div>
      </div>
    </div>
  );
};


export default DetailsPage;
