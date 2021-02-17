import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateMovie ({editCount}) {
    const [movieValue, setMovieValue] = useState(null)
    const history = useHistory();
    const matchRoute = useRouteMatch();
    
    useEffect(() => {
       const id = matchRoute.params.id;
       axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(result => {
                result.data = {
                    ...result.data, stars: result.data.stars.toString()
                }
                setMovieValue(result.data)
            })
            .catch(error => {
                console.log('error getting data', error.message)
            })
    }, [matchRoute.params.id]);

    const handleChange = event => {
        setMovieValue({
            ...movieValue, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        movieValue.metascore = movieValue.metascore * 1;
        movieValue.stars = movieValue.stars.split(',');

        const id = matchRoute.params.id;
        axios.put(`http://localhost:5000/api/movies/${id}`, movieValue)
             .then(() => {
                 editCount();
                 history.push(`/movies/${id}`);
             })
             .catch(error => console.log('error putting', error.message))
    }

    const back = () => {
        const id = matchRoute.params.id;
        history.push(`/movies/${id}`)
    }

    return(
        <div className='container'>
            <div onClick={back}>Back???????????????????</div>
        
        {movieValue && (
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <div>
                    <input type='text' name='title'
                    value={movieValue.title} onChange={handleChange} />
                </div>

                <label>Director</label>
                <div>
                    <input type='text' name='director'
                    value={movieValue.director} onChange={handleChange} />
                </div>

                <label>Metascore</label>
                <div>
                    <input type='text' name='metascore'
                    value={movieValue.metascore} onChange={handleChange} />
                </div>

                <label>Stars</label>
                <div>
                    <input type='text' name='stars'
                    value={movieValue.stars} onChange={handleChange} />
                </div>
            </form>
        )}
        </div>
    )
}

export default UpdateMovie;