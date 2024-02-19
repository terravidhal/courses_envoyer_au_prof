import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from "axios";




const CourseTable = (props) => {
  const { allCourses } = props;
  const [allUser, setAllUser] = useState([]);
  const [loaded, setLoaded] = useState(false);


  // get all courses
  useEffect(() => {
    getallUser();
  }, []); 



  // get specific user
  const getOneUser = (userId) => {
    axios.get("http://localhost:8000/api/users/" + userId,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleUser);
          setAllUser([...allUser, res.data.oneSingleUser]);
          setLoaded(true); // data available => set "true"
          //console.log("y++++++++++",allUser.students);
        })
        .catch( err => console.log(err) );
  }

  // get Many user
  const getManyUser = (userIdArray) => {
    axios.get("http://localhost:8000/api/usersMany/" + userIdArray,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.users);
          setAllUser([...allUser, res.data.users]);
          setLoaded(true); // data available => set "true"
          //console.log("y++++++++++",allUser.students);
        })
        .catch( err => console.log(err) );
  }

  // get all user
  const getallUser = async() => {
    const students = await allCourses.map((elt,index) => elt.students);
    await console.log('humm', students);
   // getManyUser(students)
  // students ? students = students : students = [];
    // students.forEach(userId => {
    //   getOneUser(userId)
    // });
    
  }


 



  return (
    <div className="CourseTable">
      <Table striped >
         <thead>
          <tr>
            <th>Name of Course</th>
            <th>Level</th>
            <th>Instructor</th>
            <th>Day Of Week</th>
            <th>Time</th>
            <th>Students</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allCourses.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions">{elt.level}</td>
                <td  className="actions">{elt.instructor}</td>
                <td  className="actions">{elt.dayOfWeek}</td>
                <td  className="actions">{elt.time}</td>
                <td  className="actions">
                  {/* {elt.students} */}
                  <ul>
                    { loaded === true ? 
                     allUser.students.map((elt) => (
                       <li key={elt._id}>
                         {elt}
                       </li>
                     )) : null
                    }   
                  </ul>
                  </td>
                <td className="actions">
                  <Link className=""  to={"/courses/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/courses/edit/" + elt._id}>
                    edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};



export default CourseTable;
