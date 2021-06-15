import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/useHttp";
import { postTask } from "../../api/tasksApi";

const NewTask = props => {
  const [sendPostRequest, httpState] = useHttp();

  const enterTaskHandler = async task => {
    sendPostRequest(postTask, task, props.onAddTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={httpState.loading} />
      {httpState.error && <p>{httpState.error}</p>}
    </Section>
  );
};

export default NewTask;
