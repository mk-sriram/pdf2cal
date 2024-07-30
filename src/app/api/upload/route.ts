import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, Files } from "formidable";
import fs from "fs";
import path from "path";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to ensure the upload directory exists
const ensureUploadDirExists = (uploadDir: string) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const uploadDir = path.join(process.cwd(), "/public/uploads");
ensureUploadDirExists(uploadDir);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: false, // Single file upload
      uploadDir: uploadDir, // Directory to save uploaded files
      keepExtensions: true, // Keep file extension
    });

    form.parse(req, (err, fields, files: Files) => {
      if (err) {
        console.error("Error parsing the file", err);
        return res.status(500).json({ error: "Error parsing the file" });
      }

      // Access the uploaded file details safely
      const uploadedFile = Array.isArray(files.file)
        ? files.file[0]
        : files.file;
      if (uploadedFile instanceof File) {
        console.log("Uploaded file:", uploadedFile);

        // Respond with success and file details
        return res
          .status(200)
          .json({ message: "File uploaded successfully", file: uploadedFile });
      } else {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
