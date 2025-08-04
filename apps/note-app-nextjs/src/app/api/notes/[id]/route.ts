import {NextResponse} from "next/server";

export async function PUT(req: Request, { params } : {params: {id: string}}) {
    const body = await req.json();
    const response = await fetch(`http://localhost:3010/api/notes/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const result = await response.json();

    return NextResponse.json(result, {status: result.status});
}

export async function DELETE(req: Request, {params} : {params: {id: string}}) {
    // const body = await req.json();
    const response = await fetch(`http://localhost:3010/api/notes/${params.id}`, {
        method: 'DELETE'
    })
    const status = response.status;
    const result = await response.json().catch(() => ({})); // in case there's no body

    return NextResponse.json(result, { status });
}