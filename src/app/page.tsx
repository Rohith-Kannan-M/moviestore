'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "./constant";

export default function Home() {

  const router = useRouter();
  const [moviesData, setMoviesData] = useState([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',  // This will give you abbreviated month names like "Aug"
      day: '2-digit',
    };
  
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      // const res = await apiClient.get(`/api/movies`, {
      //   method: 'GET'
      // });
      const res = await fetch(`/api/movies`, {
        method: 'GET'
      });
      const resp = await res.json();
      // console.log(res);
      // const resp: any = res;
      console.log(resp);
      setMoviesData(resp.results);
    }

    fetchMoviesData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/pages/${id}`);
  }

  return (
    <div className="movie-list">
      {moviesData && moviesData.map((movie: any, index: number) => (
        <div key={index} className="movie-card" onClick={() => handleClick(movie.id)}>
          <div>
            <img src={IMAGE_URL + movie.poster_path} alt="Example" width="300" height="300" />
          </div>
          <div>{ movie.title }</div>
          <div className="movie-date">{ formatDate(movie.release_date) }</div>
        </div>
      ))}
    </div>
  );
}
