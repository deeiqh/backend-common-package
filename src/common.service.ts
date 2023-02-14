import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  //payload?.value?.payload?.userId?.value
  //payload?.value?.payload?.customerUserEmail?.props?.email
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

  reducePayload(payload: Record<string, any>): Record<string, any> {
    if (!payload) return {};
    if (payload.value) {
      if (payload.value.payload) {
        if (typeof payload.value.payload !== 'object') {
          payload['value'] = payload.value.payload;
        } else {
          this.reduceModel(payload, payload.value.payload);
          // for (const [property] of Object.keys(payload.value.payload)) {
          //   if (payload.value.payload[property].value) {
          //     payload[property] = payload.value.payload[property].value;
          //   } else if (payload.value.payload[property].props) {
          //     for (const [prop, value] of Object.keys(
          //       payload.value.payload.props,
          //     )) {
          //       payload[property][prop] = value;
          //     }
          //   } else if (typeof payload.value.payload[property] === 'object') {
          //     for (const [key, value] of Object.keys(
          //       payload.value.payload[property],
          //     )) {
          //       payload[property][key] = value;
          //     }
          //   } else {
          //     payload[property] = payload.value.payload[property];
          //   }
          // }
        }
      } else {
        return payload.value;
      }
    }
    return payload;

    //payload?.value?.payload?.userId?.value
    //payload?.value?.payload?.customerUserEmail?.props?.email

    // let lastValue;
    // let lastModel: Record<string, unknown>;
    // let lastKey;

    // let reducedModel: Record<string, unknown> = {};
    // let current = model;
    // let value: any
    // while (current !== null) {
    //   value = current
    //   if (typeof value === 'object') {
    //     if (['payload', 'value', 'props'].find((e) => e === key)) {
    //       continue;
    //     } else {
    //       reducedModel = value;
    //     }
    //   } else {
    //     reducedModel[key] = value;
    //   }

    //   // switch (key) {
    //   //   case 'payload':
    //   //     break;
    //   //   case 'value':
    //   //     lastValue = value;
    //   //     break;
    //   //   default:
    //   //     model[key] = value; //model.userId
    //   //     lastModel = model[key];
    //   //     lastKey = key;
    //   // }
    // }
    // if (lastValue) {
    //   lastModel[lastKey] = lastValue;
    // }
    // return model;
  }
}
