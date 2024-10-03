'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  console.log("Params:", params);
    const [movieDetails, setMovieDetails] = useState<any>();

  useEffect(() => {
    const fetchMoviesData = async () => {
      const res = await fetch(`http://localhost:3000/api/movies/${params.id}`, {
        method: 'GET'
      });
      const resp = await res.json();
      console.log(resp);
      setMovieDetails(resp);
    }

    fetchMoviesData();
  }, [params]);

  return (
    <div>
          { movieDetails?.overview }
    </div>
  );
}
