import { ClickAnalytics } from "../../../generated/prisma/client.js";
import { AnalyticsCursorType, createAnalyticsType, RecordClickInputType } from "./analytics.types.js";

export interface IAnalyticsRepository {
  createAnalytics(data: createAnalyticsType): Promise<ClickAnalytics>;

  recordClick(data: RecordClickInputType): Promise<void>;

  findAnalyticsByShortUrlId(shortUrlId: string, limit: number, cursor?: AnalyticsCursorType): Promise<ClickAnalytics[]>
}