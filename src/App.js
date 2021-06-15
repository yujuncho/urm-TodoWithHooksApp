import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/useHttp";
import { getTasks } from "./api/tasksApi";

function App() {
  const [sendGetRequest, httpState] = useHttp(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    sendGetRequest(getTasks, "", setTasks);
  }, [sendGetRequest]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={httpState.loading}
        error={httpState.error}
        onFetch={sendGetRequest}
      />
    </React.Fragment>
  );
}

export default App;
