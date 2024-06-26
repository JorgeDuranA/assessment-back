import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
@Injectable()
export class MomentTimezoneAdapter {
  constructor(timezone = 'America/Mexico_City') {
    moment.tz.setDefault(timezone);
  }

  public createMoment() {
    return moment();
  }
  public setTimezone(date: Date | string) {
    return moment(date).format();
  }

  public formats() {
    return {
      MMMDDYYYY: 'MMM DD YYYY', //Sep 04 2023
      'YYYY-MM-DD': 'YYYY-MM-DD', //2023-10-24
    };
  }
}
