import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    let queryString = searchParams.size > 0 ? '?' : '';
    let index = 0;

    for (const [key, value] of searchParams) {
        index++;
        queryString += `${key}=${value}`;
        if(index < searchParams.size) {
            queryString+='&';
        }
    }

    const backendUrl = `http://localhost:3010/api/notes${queryString}`;
    const response = await fetch(backendUrl);
    const result = await response.json();

    return NextResponse.json(result, { status: result.status });
}

export async function POST(req: Request) {
    const body = await req.json();
    const response = await fetch('http://localhost:3010/api/notes', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const result = await response.json();

    return NextResponse.json(result, {status: result.status});
}
