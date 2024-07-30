import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import * as dateFn from "date-fns";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  console.log("API called");

  // Parse the form data and extract the file
  const formData = await request.formData();
  const file = formData.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  // Convert the file Blob to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Define the directory for file uploads
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  // Check if the directory exists, if not, create it
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error creating directory:", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  // Generate a unique filename with the correct extension
  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalFileName = (file as File).name;
    const extension = mime.getExtension(file.type) || "png"; // Default to png if the type is not recognized
    const filename = `${uniqueSuffix}.${extension}`;
    const filePath = `${uploadDir}/${filename}`;

    // Write the file to the specified path
    await writeFile(filePath, buffer);

    // Return the file URL
    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
  } catch (e) {
    console.error("Error uploading file:", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
