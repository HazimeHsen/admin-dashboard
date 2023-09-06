import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();

  const fileExtension = path.extname(file.name);
  const newFilename = `${timestamp}${fileExtension}`;

  const projectDir = process.cwd();

  const relativePath =
    "https://admin-dashboard-cyan-two.vercel.app/images/" + newFilename;

  try {
    await writeFile(relativePath, buffer);
    console.log(`Uploaded file saved at: ${relativePath}`);
    return NextResponse.json({ success: true, path: relativePath, projectDir });
  } catch (error) {
    console.error("Error saving the file:", error);
    return NextResponse.json({ success: false, error: "File upload failed" });
  }
}
