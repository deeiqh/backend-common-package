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
    modelObject?: Record<string, any>,
  ): void {
    if (!modelObject) {
      modelObject = model;
    }

    for (const [property] of Object.entries(modelObject)) {
      if (modelObject[property].value) {
        model[property] = modelObject[property].value;
      } else if (modelObject[property].props) {
        model[property] = {};
        this.reduceModel(model[property], modelObject[property].props);
      } else if (typeof modelObject[property] === 'object') {
        model[property] = modelObject[property];
        for (const [key] of Object.entries(modelObject[property])) {
          this.reduceModel(model[property], modelObject[property][key]);
        }
      } else {
        model[property] = modelObject[property];
      }
    }
  }
}
