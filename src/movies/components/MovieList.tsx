import React, { useState } from 'react';

import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies } from './MovieProvider';

type NewMovieMode = "BUTTON" | "FORM"

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState('button');

  const handleSubmission = (data: Record<"imageUrl" | "title" | "subtitle" | "description", string>) => {
    //console.log(movie);
    //now here do smt with data
    moviesDispatch({
      type: 'add',
      payload: {
        movie : data ,
      }
    });
    setDisplayOptionType('button');
  }

  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>
      ))}
      <Card>
        {displayOptionType === 'form' ? <AddMovieForm onSubmit={handleSubmission} onCancel={() => { setDisplayOptionType('button'); }} /> : ''}
        {displayOptionType !== 'form' ? <AddMovieButton onClick={() => { displayOptionType !== 'form' ? setDisplayOptionType('form') : setDisplayOptionType('button') }} /> : ''}
      </Card>
    </div>
  );
}
