import Tasks from "../components/tasks";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Users } from "lucide-react"

const TasksPage = () => {
    return(
        <>
        <Header
            title="Tasks"
            icon={<Users className="w-5 h-5" />}
        />
        <Sidebar />
        <Tasks />
        </>
    )
}

export default TasksPage;
