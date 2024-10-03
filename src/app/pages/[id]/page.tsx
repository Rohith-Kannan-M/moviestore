'use client'
import { IMAGE_URL } from "@/app/constant";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState<any>();

  const detailFields = ['status', 'original_language', 'revenue', 'vote_average'];

  const currFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    const fetchMoviesData = async () => {
      const res = await fetch(`/api/movies/${params.id}`, {
        method: 'GET'
      });
      const resp = await res.json();
      console.log(resp);
      setMovieDetails(resp);
    }

    fetchMoviesData();
  }, []);

  const getFieldFormattedValue = (field: string, value: string) => {
    switch (field) {
      case 'original_language':
        value = (movieDetails.spoken_languages.find((lang: any) => lang.iso_639_1 === value)).english_name;
        break;
      case 'revenue':
        value = currFormat.format(parseInt(value, 10));
      default:
        break;
    }
    return value;
  }

  return (
    movieDetails && <div className="details-page">
      <div className="cover-photo" style={{ backgroundImage: "url(" + IMAGE_URL + movieDetails.backdrop_path + ")" }}>
        {/* <img src={IMAGE_URL + movieDetails.backdrop_path} alt="Example" /> */}
      </div>
      <div
        className="details-content"
      >
        <div style={{
          display: 'flex',
          padding: '5%'
        }}>
          <div>
            <img src={IMAGE_URL + movieDetails.poster_path} alt="Example" width="300" height="300" />
          </div>
          <div className="details-column">
            <div className="movie-title">
              <div
                style={{
                  fontWeight: 'bold'
                }}
              >{movieDetails.title}</div>
              <div>{'(' + movieDetails.release_date.split('-')[0] + ')'}</div>
            </div>
            <div className="title-sub">
              <div>{movieDetails.release_date}</div>
              <div className="divider"></div>
              <div>{(movieDetails.genres.map((eachGenre: any) => eachGenre.name)).join(', ')}</div>
              <div className="divider"></div>
              <div>{Math.floor(movieDetails.runtime / 60) + 'h' + ' ' + (movieDetails.runtime % 60) + 'm'}</div>
            </div>
            <div className="tag-line">
              {movieDetails.tagline}
            </div>
            <div className="overview">
              <div className="field-name">
                Overview
              </div>
              <div className="field-value">
                {movieDetails.overview}
              </div>
            </div>
            <div className="detail-fields">
              {
                detailFields.map((field: string, index: number) => (
                  <div key={'field-' + index}>
                    <div className="field-name">{field.replaceAll('_', ' ')}</div>
                    <div className="field-value">{getFieldFormattedValue(field, movieDetails[field])}</div>
                  </div>
                ))
              }</div>
          </div>
        </div>
      </div>
    </div>
  );
}
