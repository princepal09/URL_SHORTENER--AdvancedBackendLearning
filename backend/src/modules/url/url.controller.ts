import { catchAsync } from '../../utils/common/helpers/catchAsync.js';
import { Request, Response } from 'express';
import { urlService } from './url.container.js';
import { sendResponse } from '../../utils/response/AppResponse.js';

export class UrlController {
  createshortUrl = catchAsync(async (req: Request, res: Response) => {
    const { originalUrl } = req.body;

    const userId = req.user?.userId as string;

    const result = await urlService.createShortUrl({ originalUrl }, userId);

    sendResponse(res, 201, {
      success: true,
      message: 'Short URL Created Successfully',
      data: result,
    });
  });

  redirectToOriginURL = catchAsync(async (req: Request, res: Response) => {
    const shortCode = req.params.shortCode as string;

    const originalUrl = await urlService.getOriginalUrlFromShortCode(shortCode);

    res.redirect(originalUrl);
  });

  updateOriginalUrl = catchAsync(async (req:Request, res:Response) => {
    const shortCode = req.params.shortCode as string;
    const userId = req.user?.userId as string;
    const {updatedOriginalUrl} = req.body;
    const result = await urlService.updateShortUrl(userId, shortCode, {updatedOriginalUrl});


    sendResponse(res, 201, {
      success: true,
      message: 'Original URL Updated Successfully',
      data: result
    });

  })
}
