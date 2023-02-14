import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  reducePayload(payload: Record<string, any>): void {
    //examples:
    //  payload.value?.payload?.userId?.value
    //    => payload.userId
    //  payload.value?.payload?.customerUserEmail?.props?.email
    //    => payload.customerUserEmail.email
    //  payload.value?.payload?.customerUserEmail?.props?.email.value
    //    => payload.customerUserEmail.email

    if (payload.value) {
      if (payload.value.payload) {
        if (typeof payload.value.payload !== 'object') {
          payload['value'] = payload.value.payload;
        } else {
          this.reduceModel(payload, payload.value.payload);
        }
      }
    }
  }

  reduceModel(
    model: Record<string, any>,
    fromProperty?: Record<string, any>,
  ): void {
    if (!fromProperty) {
      fromProperty = model;
    }

    for (const [property] of Object.keys(fromProperty)) {
      if (fromProperty[property].value) {
        model[property] = fromProperty[property].value;
      } else if (fromProperty[property].props) {
        this.reduceModel(model[property], fromProperty[property].props);
      } else if (typeof fromProperty[property] === 'object') {
        for (const [key, value] of Object.keys(fromProperty[property])) {
          model[property][key] = value;
        }
      } else {
        model[property] = fromProperty[property];
      }
    }
  }
}
