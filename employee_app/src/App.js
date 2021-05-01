import './App.css';
import axios from 'axios';
import React, {useState} from 'react';

function App() {
  const [response, setResponse] = useState([])
  const [employeeName, setEmployeeName] = useState()
  const [employeePosition, setEmployeePosition] = useState()
  const [employeeid, setEmployeeId] = useState()
  const [newId, setNewId] = useState()
  const [newName, setNewName] = useState()
  const [newPosition, setNewPosition] = useState()
  const [restPage, setRestPage] = useState('GET')


  const getData = () => {
    axios.get('http://localhost:5000')
    .then(res => {
        setResponse(res.data);
        console.log(response)
    })
    .catch( err => {
        console.log(err);
    })
  }

  const postData = () => {
    axios.post('http://localhost:5000', 
    {
      nama: employeeName,
      posisi: employeePosition
    })
    .then(function (res) {
      setResponse([res.data])
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    })
    
  }

  const deleteData = () => {
    axios.delete(`http://localhost:5000/${employeeid}`)
    .then(function (res) {
      setResponse([res.data])
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  const putData = () => {
    axios.put(`http://localhost:5000/${newId}`,
    {
      nama: newName,
      posisi: newPosition
    }
    )
    .then(function (res) {
      setResponse([res.data])
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    })
  }
  return (
    <div>
      <div className='header'>
        <h1>Tugas Arsitektur Perangkat Lunak</h1>
        <h3>Sadad Zulfanazhif Pasa (19/444069/TK/49265)</h3>
        <h3>Alvin Indra Kurniawan (19/439808/TK/48538)</h3>
      </div>
      
      <div className='container'>
        <div className='left-container'>
          <nav>
            <ul>
              <li className={ restPage === 'GET' ? 'active-page' : null} onClick={() => setRestPage('GET')}>GET</li>
              <li className={ restPage === 'POST' ? 'active-page' : null} onClick={() => setRestPage('POST')}>POST</li>
              <li className={ restPage === 'PUT' ? 'active-page' : null} onClick={() => setRestPage('PUT')}>PUT</li>
              <li className={ restPage === 'DELETE' ? 'active-page' : null} onClick={() => setRestPage('DELETE')}>DELETE</li>
            </ul>
          </nav>
          { restPage === 'GET' ?
            <div className='rest-method' id='get-method'>
              <button onClick={() => getData()}>GET</button>
            </div>
            : null
          }
          { restPage === 'POST' ?
            <div className='rest-method' id='post-method'>
              <form>
                <label>
                  Nama : 
                  <input id='employee-name' onChange={e => setEmployeeName(e.target.value)}></input>
                </label>
                <br></br>
                <label>
                  Posisi :
                  <input id='employee-position' onChange={e => setEmployeePosition(e.target.value)}></input>
                </label>
              </form>
              <button onClick={() => postData()}>POST</button>
            </div>
            : null
          }
          { restPage === 'DELETE' ?
            <div className='rest-method' id='delete-method'>
              <form>
                ID :
                <input id='employee-id' onChange={e => setEmployeeId(e.target.value)}></input>
              </form>
              <button onClick={() => deleteData()}>DELETE</button>
            </div>
            : null
          }
          { restPage === 'PUT' ?
            <div className='rest-method' id='put-method'>
              <form>
                <label>
                  ID :
                  <input id='employee-id' onChange={e => setNewId(e.target.value)}></input>
                </label>
                <br></br>
                <label>
                  Nama Baru :  
                  <input id='employee-name' onChange={e => setNewName(e.target.value)}></input>
                </label>
                <br></br>
                <label>
                  Posisi Baru :
                  <input id='employee-position' onChange={e => setNewPosition(e.target.value)}></input>
                </label>
              </form>
              <button onClick={() => putData()}>PUT</button>
            </div>
            : null
          }
        </div>
        <div className='right-container'>
          <h3>Response</h3>
          <div className='response-page'>
            {
            response.map(i => (<div><pre>{ JSON.stringify(i) }</pre></div>))
          }
          </div>
        </div>
      </div>
      

      
    </div>
  );
}

export default App;
