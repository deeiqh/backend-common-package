import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  reducePayload(payload: Record<string, any>): Record<string, any> | undefined {
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

          return {
            type: 'object',
            properties: {
              value: { type: typeof payload.value.payload },
            },
          };
        } else {
          return this.reduceModel(payload, payload.value.payload);
        }
      }
    }

    return;
  }

  reduceModel(
    model: Record<string, any>,
    modelObject?: Record<string, any>,
  ): Record<string, any> {
    const schema: Record<string, any> = {
      type: 'object',
      properties: {},
    };

    this.reduceModelOperation(schema, model, modelObject);

    return schema;
  }

  reduceModelOperation(
    schema: Record<string, any>,
    model: Record<string, any>,
    modelObject?: Record<string, any>,
  ): void {
    if (!modelObject) {
      modelObject = model;
    }

    //examples:
    //  payload.value?.payload?.userId?.value
    //    => payload.userId
    //  payload.value?.payload?.customerUserEmail?.props?.email
    //    => payload.customerUserEmail.email
    //  payload.value?.payload?.customerUserEmail?.props?.email.value
    //    => payload.customerUserEmail.email

    for (const [property] of Object.entries(modelObject)) {
      if (modelObject[property].value) {
        model[property] = modelObject[property].value;

        schema.properties[property] = {};
        schema.properties[property]['type'] =
          typeof modelObject[property].value;
      } else if (modelObject[property].props) {
        model[property] = {};

        schema.properties[property] = {};
        schema.properties[property]['type'] = 'object';
        schema.properties[property]['properties'] = {};

        this.reduceModelOperation(
          schema.properties[property],
          model[property],
          modelObject[property].props,
        );
        //  payload.value?.payload?.customerUserEmail?.clark?.email.value
      } else if (typeof modelObject[property] === 'object') {
        model[property] = {};

        schema.properties[property] = {};
        schema.properties[property]['type'] = 'object';
        schema.properties[property]['properties'] = {};

        this.reduceModelOperation(
          schema.properties[property],
          model[property],
          modelObject[property],
        );
      } else {
        model[property] = modelObject[property];

        schema.properties[property] = {};
        schema.properties[property]['type'] = typeof modelObject[property];
      }
    }
  }
}
