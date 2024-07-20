import React, { useEffect, useState } from 'react';
import './Movie.css';
import { useParams } from 'react-router-dom';

const Movie = () => {
  const [currMovie, setCurrMovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    )
      .then((res) => res.json())
      .then((data) => setCurrMovie(data));
  };

  return (
    <div className="movie">
      <div className="movie_intro">
        <img
          className="movie_backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currMovie ? currMovie.backdrop_path : ''
          }`}
          alt=""
        />
      </div>
      <div className="movie_detail">
        <div className="movie_detailLeft">
          <div className="movie_posterBox">
            <img
              className="movie_poster"
              src={`https://image.tmdb.org/t/p/original${
                currMovie ? currMovie.poster_path : ''
              }`}
              alt=""
            />
          </div>
        </div>
        <div className="movie_detailRight">
          <div className="movie_detailRightTop">
            <div className="movie_name">
              {currMovie ? currMovie.original_title : ''}
            </div>
            <div className="movie_tagline">
              {currMovie ? currMovie.tagline : ''}
            </div>
            <div className="movie_rating">
              {currMovie ? currMovie.vote_average : ''}{' '}
              <i className="fas fa-star" />
              <span className="movie_voteCount">
                {currMovie ? '(' + currMovie.vote_count + ') votes' : ''}
              </span>
            </div>
            <div className="movie_runtime">
              {currMovie ? currMovie.runtime + 'min' : ''}
            </div>
            <div className="movie_releaseDate">
              {currMovie ? 'Release date: ' + currMovie.release_date : ''}
            </div>
            <div className="movie_genres">
              {currMovie && currMovie.genres
                ? currMovie.genres.map((genre) => (
                    <>
                      <span className="movie_genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ''}
            </div>
          </div>
          <div className="movie_detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currMovie ? currMovie.overview : ''}</div>
          </div>
        </div>
      </div>
      <div className="movie_links">
        <div className="movie_heading">Useful Links</div>
        {currMovie && currMovie.homepage && (
          <a
            href={currMovie.homepage}
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <p>
              <span className="movie_homeButton movie_Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currMovie && currMovie.imdb_id && (
          <a
            href={'https://www.imdb.com/title/' + currMovie.imdb_id}
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <p>
              <span className="movie_imdbButton movie_Button">
                IMDB <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie_heading">Production companies</div>
      <div className="movie_production">
        {currMovie &&
          currMovie.production_companies &&
          currMovie.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    src={
                      'https://image.tmdb.org/t/p/original' + company.logo_path
                    }
                    alt=""
                    className="movie_productionCompany"
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Movie;
