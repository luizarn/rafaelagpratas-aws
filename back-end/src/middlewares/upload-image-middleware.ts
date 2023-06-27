import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import { AuthenticatedRequest } from './authentication-middleware';

export interface CustomRequest extends AuthenticatedRequest {
  publicUrl?: string;
}

const s3 = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: `${process.env.ACCESSKEYID}`,
    secretAccessKey: `${process.env.SECRETACCESSKEY}`,
  },
});

function createUploadMiddleware() {
  if (process.env.JEST_WORKER_ID || process.env.NODE_ENV === 'test') {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
      next();
    };
  }

  const upload = multer({
    storage: multer.memoryStorage(),
  });
  console.log('esta chegando aqui');
  console.log('photo');
  return upload.single('photo');
}

export const uploadImage = createUploadMiddleware();

export const handleUpload = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (process.env.JEST_WORKER_ID || process.env.NODE_ENV === 'test') {
      const publicUrl = 'https://aquitemplacas.com.br/img/produtos/g/36-atencao-area-de-teste.jpg';
      req.publicUrl = publicUrl;
      next();
    } else {
      const file = req.file;
      console.log(file);
      if (!file) {
        return generateBadRequestResponse(res);
      }
      console.log('esta chegando aqui');
      const uploadParams = {
        Bucket: 'rafaelagpratas',
        Key: `${Date.now().toString()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3.send(command);

      const publicUrl = `https://rafaelagpratas.s3.amazonaws.com/${uploadParams.Key}`;
      console.log(`upload middleware ${publicUrl}`);
      req.publicUrl = publicUrl;
      console.log(`2 upload middleware ${publicUrl}`);
      next();
    }
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return generateBadRequestResponse(res);
  }
};

function generateBadRequestResponse(res: Response) {
  res.status(httpStatus.BAD_REQUEST).send('Erro ao fazer upload da imagem.');
}
