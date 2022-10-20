import React, {useState, useCallback} from "react";
import './App.css';
import List from "./components/Lists";
import Form from "./components/Form";


const initialTodoData =
 localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];


export default function App() {


  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");




  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));},[todoData])
  

  const handleSubmit=(e) => {
    e.preventDefault();

    let newTodo = {
      id:Date.now(),
      title: value,
      completed: false,
    };

    setTodoData(prev => [...prev, newTodo]);  
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");
  }  

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }


  
    return(
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3">
            <h1>할 일 목록</h1>
            <button onClick={handleRemoveClick}>Delete All</button>
          </div>

          <List todoData={todoData} setTodoData={setTodoData} handleClick={handleClick}/>

          <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
  {/* map()함수를 사용해서 새로운 배열요소를 함수를 계산해서 처리하는 거싱고 ==> filter()함수를 사용해서 data => data.id !== id로 일치하지 않는 값을 판단해주기 위해서 filter()함수를 사용한다,  */}          
        </div>
      </div>
    )
  
}
