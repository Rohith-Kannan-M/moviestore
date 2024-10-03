'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();
  const [moviesData, setMoviesData] = useState([]);
  const imageURL = 'https://image.tmdb.org/t/p/w500/';

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
      const res = await fetch(`/api/movies`, {
        method: 'GET'
      });
      const resp = await res.json();
      console.log(resp);
      setMoviesData(resp.results);
    }

    fetchMoviesData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/pages/${id}`);
  }

  return (
    <div style={{
      display: 'flex',
      flexFlow: 'wrap',
      margin: '0px 20px',
      justifyContent: 'center'
    }}>
      {moviesData.map((movie: any, index: number) => (
        <div key={index} style={{ padding: '20px' }} onClick={() => handleClick(movie.id)}>
          <div>
            <img src={imageURL + movie.poster_path} alt="Example" width="300" height="300" />
          </div>
          <div>{ movie.title }</div>
          <div style={{ fontSize: 12 }}>{ formatDate(movie.release_date) }</div>
        </div>
      ))}
    </div>
  );
}
