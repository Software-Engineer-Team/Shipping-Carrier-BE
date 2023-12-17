import { Logger } from "../logger/logger";

import qrcode from "qrcode";
export const generateQRCode = async (trackingId: string) => {
  const logger = new Logger("generateQRCode").getLogger();
  try {
    const qrCodeImageUrl = await qrcode.toDataURL(trackingId);

    logger.debug(`QRCodeImageUrl: ${qrCodeImageUrl}`);
    return qrCodeImageUrl;
  } catch (error) {
    logger.error("Could not generate QR code: ", error);
  }
};
