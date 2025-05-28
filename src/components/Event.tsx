import { useLocation, useNavigate, useParams } from "react-router";

function Event() {
    const params = useParams();
    const navigate = useNavigate();

    if (!params.id) {
        navigate('/');
    }
    
    return <div>
        <h1>Event Name</h1>
        <div>{params.id}</div>
    </div>
}

export default Event;