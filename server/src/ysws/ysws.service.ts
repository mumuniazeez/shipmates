import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { YsWsResponseDto } from './dto/ysws-response.dto';

@Injectable()
export class YswsService {
  constructor(private readonly httpService: HttpService) {}

  async getAllYswsProgram() {
    const res = await this.httpService.axiosRef.get<{
      limitedTime: YsWsResponseDto[];
      recentlyEnded: YsWsResponseDto[];
      drafts: YsWsResponseDto[];
      indefinite: YsWsResponseDto[];
    }>('https://ysws.hackclub.com/api.json');
    if (res.status !== 200)
      throw new InternalServerErrorException('Failed to fecth YSWs programs');

    const yswsArr = [
      ...res.data.limitedTime,
      ...res.data.recentlyEnded,
      ...res.data.drafts,
      ...res.data.indefinite,
    ];
    return yswsArr;
  }

  async getActiveYswsProgram() {
    const res = await this.httpService.axiosRef.get<{
      limitedTime: YsWsResponseDto[];
      recentlyEnded: YsWsResponseDto[];
      drafts: YsWsResponseDto[];
      indefinite: YsWsResponseDto[];
    }>('https://ysws.hackclub.com/api.json');
    if (res.status !== 200)
      throw new InternalServerErrorException('Failed to fecth YSWs programs');

    const yswsArr = [
      ...res.data.limitedTime,
      ...res.data.recentlyEnded,
      ...res.data.drafts,
      ...res.data.indefinite,
    ];

    return yswsArr.filter((ysws) => ysws.status === 'active');
  }

  async getEndedYswsProgram() {
    const res = await this.httpService.axiosRef.get<{
      limitedTime: YsWsResponseDto[];
      recentlyEnded: YsWsResponseDto[];
      drafts: YsWsResponseDto[];
      indefinite: YsWsResponseDto[];
    }>('https://ysws.hackclub.com/api.json');
    if (res.status !== 200)
      throw new InternalServerErrorException('Failed to fecth YSWs programs');

    const yswsArr = [
      ...res.data.limitedTime,
      ...res.data.recentlyEnded,
      ...res.data.drafts,
      ...res.data.indefinite,
    ];

    return yswsArr.filter((ysws) => ysws.status === 'ended');
  }

  async searchYswsProgram(q: string) {
    const res = await this.httpService.axiosRef.get<{
      limitedTime: YsWsResponseDto[];
      recentlyEnded: YsWsResponseDto[];
      drafts: YsWsResponseDto[];
      indefinite: YsWsResponseDto[];
    }>('https://ysws.hackclub.com/api.json');
    if (res.status !== 200)
      throw new InternalServerErrorException('Failed to fecth YSWs programs');

    const yswsArr = [
      ...res.data.limitedTime,
      ...res.data.recentlyEnded,
      ...res.data.drafts,
      ...res.data.indefinite,
    ];

    const normalizedQuery = q.toLowerCase().trim();

    if (!normalizedQuery) return yswsArr;

    return yswsArr.filter(
      (ysws) =>
        ysws.name.toLowerCase().includes(normalizedQuery) ||
        ysws.description.toLowerCase().includes(normalizedQuery),
    );
  }
}
