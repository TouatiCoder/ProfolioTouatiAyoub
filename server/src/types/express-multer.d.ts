declare namespace Express {
  export namespace Multer {
    export interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination?: string;
      filename?: string;
      path?: string;
      buffer?: Buffer;
    }
  }

  export interface Request {
    files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
  }
}
