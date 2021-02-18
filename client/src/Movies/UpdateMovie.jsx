import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateMovie ({movieData, setMovieData}) {
    const [movieValue, setMovieValue] = useState()
    const history = useHistory();
    const {id} = useParams();
    
    useEffect(() => {
       axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(result => {
                setMovieValue(result.data)
            })
            .catch(error => {
                console.log('error getting data', error.message)
            })
    },[]);

    const handleChange = event => {
        event.preventDefault();
        setMovieValue({
            ...movieValue, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movieValue)
             .then((result) => {
                 setMovieData([...movieData, result.data])
                 history.push(`/movies/${id}`);
             })
             .catch(error => console.log('error putting', error.message))
    }

    return(
        <div className='container'>
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