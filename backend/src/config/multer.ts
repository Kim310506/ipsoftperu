// src/config/multer.ts

import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    const dir = "uploads/ocurrencias";

    if (!fs.existsSync(dir)) {

      fs.mkdirSync(dir, {
        recursive: true
      });

    }

    cb(null, dir);

  },

  filename: (req, file, cb) => {

    const unique =
      `${Date.now()}-${file.originalname}`;

    cb(null, unique);

  },

});

export const upload =
  multer({ storage });