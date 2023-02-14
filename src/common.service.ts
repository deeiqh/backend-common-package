import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  reducePayload(payload: Record<string, any>): Record<string, any> {
    //examples:
    //  payload?.value?.payload?.userId?.value
    //    => payload?.useId
    //  payload?.value?.payload?.customerUserEmail?.props?.email
    //    => payload?.customerUserEmail.email

    if (!payload) return {};

    if (payload.value) {
      if (payload.value.payload) {
        if (typeof payload.value.payload !== 'object') {
          payload['value'] = payload.value.payload;
        } else {
          this.reduceModel(payload, payload.value.payload);
        }
      } else {
        return payload.value;
      }
    }

    return payload;
  }

  reduceModel(
    model: Record<string, any>,
    fromProperty?: Record<string, any>,
  ): Record<string, any> {
    if (!fromProperty) {
      fromProperty = model;
    }

    for (const [property] of Object.keys(fromProperty)) {
      if (fromProperty[property].value) {
        model[property] = fromProperty[property].value;
      } else if (fromProperty[property].props) {
        for (const [prop, value] of Object.keys(fromProperty.props)) {
          model[property][prop] = value;
        }
      } else if (typeof fromProperty[property] === 'object') {
        for (const [key, value] of Object.keys(fromProperty[property])) {
          model[property][key] = value;
        }
      } else {
        model[property] = fromProperty[property];
      }
    }

    return model;
  }
}
