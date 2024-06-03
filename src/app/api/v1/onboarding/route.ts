export async function GET() {
  return Response.json(
    { msg: "Account created successfully", data: [] },
    { status: 200 },
  );
}
