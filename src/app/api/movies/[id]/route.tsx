import { NextResponse } from "next/server";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzRjMjE4ZDRhZDMxMjZjNTg5ZDQwNDA3MGU2NGVmMyIsIm5iZiI6MTcyNzg5OTMwOC44MDEzMywic3ViIjoiNjZmZGE1MjMxNTkyZWYxYmE5ODRiNmJiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6yGotcgWtQv24bptEcwmeXv4orbVYIyDnX_irV5Jqq4'
    }
};

export async function GET(request: any, context: any) {
    const { params } = context;
    const res = (await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options));
    const resp = JSON.stringify((await res.json()));
    return new NextResponse(resp, {
        status: 200
    });
}