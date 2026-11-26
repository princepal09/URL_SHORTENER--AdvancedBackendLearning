import { ClickAnalytics } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { AnalyticsCursorType, createAnalyticsType, RecordClickInputType } from "./analytics.types.js";
import { IAnalyticsRepository } from "./anayltics.interface.js";


export class AnalyticsRepository implements IAnalyticsRepository{
    async createAnalytics(data: createAnalyticsType): Promise<ClickAnalytics> {
        return await prisma.clickAnalytics.create({
            data
        })
    }

    async recordClick(data: RecordClickInputType): Promise<void> {
        
    }

    async findAnalyticsByShortUrlId(shortUrlId: string, limit: number, cursor?: AnalyticsCursorType): Promise<ClickAnalytics[]> {
        
    }
}