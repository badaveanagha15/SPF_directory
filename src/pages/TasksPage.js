import Tasks from "../components/tasks";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Users } from "lucide-react"
import { CheckSquare, ClipboardList, ListTodo } from "lucide-react";

const TasksPage = () => {
    return(
        <>
        <Header
            title="Tasks"
            icon={<ListTodo className="w-5 h-5" />}
        />
        <Sidebar />
        <Tasks />
        </>
    )
}

export default TasksPage;
