import {Link} from 'react-router-dom';

const NotFound = () => {
    return(
        <div className="not-found">
            <h2>Sorry</h2>
            <br></br>
            <p>That page cannot be found</p>
            <Link to="/">Back to Home Page ...</Link>
        </div>
    );
}

export default NotFound;